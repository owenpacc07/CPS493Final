<script setup>
import { onMounted } from 'vue';
import { useActivityStore } from '@/stores/activities';
import ActivityCard from '../activities/ActivityCard.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const activityStore = useActivityStore();

onMounted(() => {
    activityStore.fetchFriendActivities();
});

const formatActivity = (activity) => {
    return {
        ...activity,
        type: `${activity.userId.name}'s ${activity.type}`
    }
}
</script>

<template>
    <div class="friend-activities">
        <h2>Friend Activities</h2>
        <LoadingSpinner v-if="activityStore.loading" />
        <div v-else-if="activityStore.error" class="error-message">
            {{ activityStore.error }}
        </div>
        <div v-else-if="!activityStore.friendActivities.length" class="empty-state">
            No friend activities to show
        </div>
        <div v-else class="activity-feed">
            <ActivityCard
                v-for="activity in activityStore.friendActivities"
                :key="activity._id"
                :activity="formatActivity(activity)"
                :showActions="false"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.friend-activities {
    padding: 1rem;
}

.activity-feed {
    margin-top: 1rem;
}

.empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.error-message {
    color: #ff4757;
    padding: 1rem;
    background: rgba(255, 71, 87, 0.1);
    border-radius: 4px;
}

h2 {
    color: #FF7D00;
    margin-bottom: 1rem;
}
</style>
