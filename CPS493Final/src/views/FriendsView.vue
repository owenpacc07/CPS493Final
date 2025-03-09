<script setup>
import { useUserStore } from '@/stores/user'
import { useActivityStore } from '@/stores/activities'
import { computed } from 'vue'

const userStore = useUserStore()
const activityStore = useActivityStore()

const getFriendName = (userId) => {
    return userStore.users.find(u => u.id === userId)?.name || 'Unknown User'
}

const hasFriends = computed(() => userStore.userFriends.length > 0)
const hasActivities = computed(() => activityStore.friendActivities.length > 0)
</script>

<template>
    <div class="container">
        <h1>Friends' Activities</h1>
        
        <div v-if="!hasFriends" class="empty-state">
            <p>You don't have any friends yet!</p>
        </div>
        
        <template v-else>
            <div class="friends-list">
                <h2>Your Friends</h2>
                <div class="friend-chips">
                    <span v-for="friend in userStore.userFriends" 
                          :key="friend.id" 
                          class="friend-chip"
                    >
                        {{ friend.name }}
                    </span>
                </div>
            </div>

            <div v-if="!hasActivities" class="empty-state">
                <p>No activities from your friends yet!</p>
            </div>

            <div v-else class="activities-list">
                <div v-for="activity in activityStore.friendActivities" 
                    :key="activity.id" 
                    class="activity-card"
                >
                    <div class="activity-header">
                        <div class="activity-title">
                            <h3>{{ activity.type }}</h3>
                            <span class="friend-name">by {{ getFriendName(activity.userId) }}</span>
                        </div>
                    </div>
                    <div class="activity-details">
                        <p>Duration: {{ activity.duration }} minutes</p>
                        <p>Distance: {{ activity.distance }} km</p>
                        <p>Date: {{ new Date(activity.date).toLocaleDateString() }}</p>
                        <p v-if="activity.notes">Notes: {{ activity.notes }}</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.activities-list {
    margin-top: 2rem;
    display: grid;
    gap: 1rem;
}

.activity-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: white;
}

.activity-header {
    margin-bottom: 1rem;
}

.activity-title {
    h3 {
        margin: 0;
        color: #FF7D00;
    }

    .friend-name {
        font-size: 0.9rem;
        color: #15616D;
    }
}

.activity-details {
    p {
        margin: 0.5rem 0;
        color: #001524;  // Match the same color for consistency
    }
}

.empty-state {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin: 2rem 0;
    
    p {
        color: #666;
        font-size: 1.1rem;
    }
}

.friends-list {
    margin: 2rem 0;

    h2 {
        font-size: 1.2rem;
        color: #FF7D00;
        margin-bottom: 1rem;
    }
}

.friend-chips {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.friend-chip {
    background: #15616D;
    color: #FFECD1;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
}
</style>