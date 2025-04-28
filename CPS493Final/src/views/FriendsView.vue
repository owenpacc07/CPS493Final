<script setup>
import { onMounted } from 'vue'
import FriendList from '@/components/friends/FriendList.vue'
import FriendActivityFeed from '@/components/friends/FriendActivityFeed.vue'
import { useActivityStore } from '@/stores/activities'

const activityStore = useActivityStore()

onMounted(async () => {
    await activityStore.fetchFriendActivities()
})
</script>

<template>
    <div class="container">
        <h1>Friends & Activities</h1>
        <div class="friends-layout">
            <div class="left-panel">
                <FriendList />
            </div>
            <div class="right-panel">
                <FriendActivityFeed />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.friends-layout {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
    padding: 1rem;
    min-height: calc(100vh - 150px);
}

.left-panel, .right-panel {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1rem;
    height: fit-content;
}

h1 {
    color: #FF7D00;
    margin-bottom: 2rem;
    padding: 0 1rem;
}

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

.friends-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1rem;
}

.panel {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1rem;
}

h1 {
    color: #FF7D00;
    margin-bottom: 2rem;
    padding: 0 1rem;
}
</style>