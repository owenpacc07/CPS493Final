<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@/services/api.service';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const friends = ref([]);
const loading = ref(false);
const error = ref(null);

const searchQuery = ref('');
const searchResults = ref([]);
const searching = ref(false);

async function loadFriends() {
    try {
        loading.value = true;
        friends.value = await api.getFriends();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

async function searchUsers() {
    if (!searchQuery.value) {
        searchResults.value = [];
        return;
    }
    try {
        searching.value = true;
        const results = await api.searchUsers(searchQuery.value);
        searchResults.value = results.filter(user => 
            !friends.value.some(f => f._id === user._id)
        );
    } catch (err) {
        error.value = err.message;
    } finally {
        searching.value = false;
    }
}

async function addFriend(friendId) {
    try {
        await api.addFriend(friendId);
        await loadFriends();
        searchResults.value = searchResults.value.filter(u => u._id !== friendId);
    } catch (err) {
        error.value = err.message;
    }
}

async function removeFriend(friendId) {
    if (!confirm('Are you sure you want to remove this friend?')) return;
    try {
        await api.removeFriend(friendId);
        await loadFriends();
    } catch (err) {
        error.value = err.message;
    }
}

onMounted(loadFriends);
</script>

<template>
    <div class="friends-list">
        <h2>Your Friends</h2>
        
        <div class="search-section">
            <div class="search-box">
                <input 
                    v-model="searchQuery"
                    @input="searchUsers"
                    placeholder="Search users..."
                >
            </div>
            
            <div v-if="searching" class="searching">
                <LoadingSpinner />
            </div>
            
            <div v-else-if="searchResults.length" class="search-results">
                <div v-for="user in searchResults" :key="user._id" class="search-result">
                    <span>{{ user.name }}</span>
                    <button @click="addFriend(user._id)" class="add-btn">Add Friend</button>
                </div>
            </div>
        </div>

        <LoadingSpinner v-if="loading" />
        <div v-else-if="error" class="error-message">{{ error }}</div>
        <div v-else-if="!friends.length" class="empty-state">
            No friends yet. Try searching for users above!
        </div>
        <div v-else class="friend-grid">
            <div v-for="friend in friends" :key="friend._id" class="friend-card">
                <div class="friend-header">
                    <div>
                        <h3>{{ friend.name }}</h3>
                        <p>@{{ friend.username }}</p>
                    </div>
                    <button @click="removeFriend(friend._id)" class="remove-btn">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "sass:color";

.search-section {
    margin-bottom: 2rem;
    
    .search-box {
        position: relative;
        margin-bottom: 1rem;
        
        input {
            width: 100%;
            padding: 0.8rem 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            color: #FFECD1;
            font-size: 1rem;
            transition: all 0.3s ease;

            &::placeholder {
                color: rgba(255, 236, 209, 0.5);
            }

            &:focus {
                outline: none;
                border-color: #FF7D00;
                background: rgba(255, 255, 255, 0.1);
            }
        }
    }
}

.search-results {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-result {
    padding: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:last-child {
        border-bottom: none;
    }

    span {
        color: #FFECD1;
    }

    .add-btn {
        background: #15616D;
        color: #FFECD1;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: color.adjust(#15616D, $lightness: -10%);
        }
    }
}

.friend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.remove-btn {
    background: #78290F;
    color: #FFECD1;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: color.adjust(#78290F, $lightness: -10%);
    }
}
</style>
