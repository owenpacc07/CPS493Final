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

async function removeFriend(friendId) {
    if (!confirm('Are you sure you want to remove this friend?')) return;
    
    try {
        await api.removeFriend(friendId);
        friends.value = friends.value.filter(f => f.id !== friendId);
    } catch (err) {
        error.value = err.message;
    }
}

async function searchUsers() {
    if (!searchQuery.value) return;
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
        await loadFriends(); // Refresh friends list
        searchResults.value = searchResults.value.filter(u => u._id !== friendId);
    } catch (err) {
        error.value = err.message;
    }
}

onMounted(loadFriends);
</script>

<template>
    <div class="friends-list">
        <h2>Your Friends</h2>
        
        <!-- Add Friend Section -->
        <div class="search-section">
            <div class="search-box">
                <input 
                    v-model="searchQuery"
                    placeholder="Search users by username..."
                    @input="searchUsers"
                >
            </div>
            
            <div v-if="searching" class="searching">
                <LoadingSpinner />
            </div>
            
            <div v-else-if="searchResults.length" class="search-results">
                <div v-for="user in searchResults" :key="user._id" class="search-result">
                    <span>{{ user.name }} (@{{ user.username }})</span>
                    <button @click="addFriend(user._id)" class="add-btn">
                        Add Friend
                    </button>
                </div>
            </div>
        </div>

        <!-- Existing Friends List -->
        <LoadingSpinner v-if="loading" />
        <div v-else-if="error" class="error-message">{{ error }}</div>
        <div v-else-if="!friends.length" class="empty-state">
            You don't have any friends yet!
        </div>
        <div v-else class="friend-grid">
            <div v-for="friend in friends" :key="friend.id" class="friend-card">
                <h3>{{ friend.name }}</h3>
                <p>{{ friend.email }}</p>
                <button @click="removeFriend(friend.id)" class="remove-btn">
                    Remove Friend
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.friends-list {
    padding: 1rem;
}

.friend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.friend-card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    h3 {
        color: #FF7D00;
        margin: 0 0 0.5rem 0;
    }

    p {
        color: #666;
        margin: 0 0 1rem 0;
    }
}

.remove-btn {
    background: #78290F;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;

    &:hover {
        background: darken(#78290F, 10%);
    }
}

.empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.error-message {
    color: #ff4757;
    padding: 1rem;
    background: rgba(255, 71, 87, 0.1);
    border-radius: 4px;
}

.search-section {
    margin-bottom: 2rem;
    
    .search-box {
        margin-bottom: 1rem;
        
        input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #FFECD1;
            color: #001524;
        }
    }
}

.search-results {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
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

        &:hover {
            background: darken(#15616D, 10%);
        }
    }
}
</style>
