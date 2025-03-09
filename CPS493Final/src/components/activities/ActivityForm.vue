<script setup>
import { ref } from 'vue'

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

function handleSubmit() {
    emit('submit', { ...form.value })
    if (!props.activity.id) {
        form.value = {
            type: '',
            duration: '',
            distance: '',
            date: new Date().toISOString().split('T')[0],
            notes: ''
        }
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
        <button type="submit">{{ activity.id ? 'Update' : 'Add' }} Activity</button>
    </form>
</template>

<style scoped lang="scss">
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
    }

    input, textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
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
        background: darken(#15616D, 10%);
    }
}
</style>
