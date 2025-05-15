<script setup>
import { ref } from 'vue'
import { Autocomplete } from '@oruga-ui/oruga'
import { useUserStore } from '@/stores/user'
import { searchFriends } from '@/services/friendService'

const userStore = useUserStore()
const props = defineProps({
    activity: {
        type: Object,
        default: () => ({
            type: '',
            duration: '',
            distance: '',
            date: new Date().toISOString().split('T')[0],
            notes: ''
        })
    }
})

const emit = defineEmits(['submit'])
const form = ref({ ...props.activity })
const taggedFriends = ref([])
const searchQuery = ref('')
const isLoading = ref(false)

function handleSubmit() {
    emit('submit', { 
        ...form.value,
        taggedFriends: taggedFriends.value 
    })
    if (!props.activity.id) {
        form.value = {
            type: '',
            duration: '',
            distance: '',
            date: new Date().toISOString().split('T')[0],
            notes: ''
        }
        taggedFriends.value = []
    }
}

async function onSearch(query) {
    if (!query) return []
    isLoading.value = true
    try {
        const results = await searchFriends(query)
        return results
    } catch (error) {
        console.error('Friend search failed:', error)
        return []
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="activity-form">
        <div class="form-group">
            <label>Type:</label>
            <input v-model="form.type" required>
        </div>
        <div class="form-group">
            <label>Duration (minutes):</label>
            <input type="number" v-model="form.duration" required>
        </div>
        <div class="form-group">
            <label>Distance (km):</label>
            <input type="number" step="0.1" v-model="form.distance" required>
        </div>
        <div class="form-group">
            <label>Date:</label>
            <input type="date" v-model="form.date" required>
        </div>
        <div class="form-group">
            <label>Notes:</label>
            <textarea v-model="form.notes"></textarea>
        </div>
        <div class="form-group">
            <label>Tag Friends:</label>
            <o-autocomplete
                v-model="searchQuery"
                :data="onSearch"
                field="name"
                :loading="isLoading"
                placeholder="Type to search friends (min. 2 characters)"
                :min-length="2"
                @select="friend => taggedFriends.push(friend)"
            />
            <div v-if="taggedFriends.length" class="tagged-friends">
                <span v-for="friend in taggedFriends" 
                      :key="friend.id" 
                      class="friend-tag"
                >
                    {{ friend.name }}
                    <button type="button" @click="taggedFriends = taggedFriends.filter(f => f.id !== friend.id)"
                            class="remove-tag"
                    >×</button>
                </span>
            </div>
        </div>
        <button type="submit">{{ activity.id ? 'Update' : 'Add' }} Activity</button>
    </form>
</template>

<style scoped lang="scss">
@use "sass:color";

.activity-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
}

.form-group {
    margin-bottom: 1rem;
    
    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #FFECD1;
    }

    input, textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #FFECD1;
        color: #001524;
    }
}

button {
    width: 100%;
    padding: 0.8rem;
    background: #15616D;
    color: #FFECD1;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: color.adjust(#15616D, $lightness: -10%);
    }
}

.tagged-friends {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.friend-tag {
    background: #15616D;
    color: #FFECD1;
    padding: 0.2rem 0.5rem;
    border-radius: 15px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    .remove-tag {
        background: none;
        border: none;
        color: #FFECD1;
        cursor: pointer;
        padding: 0 0.2rem;
        font-size: 1.1rem;
        line-height: 1;

        &:hover {
            color: #FF7D00;
        }
    }
}
</style>
