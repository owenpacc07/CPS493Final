<script setup>
import { onMounted } from 'vue';
import { useActivityStore } from '@/stores/activities';
import ActivityCard from './ActivityCard.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const props = defineProps({
    showActions: {
        type: Boolean,
        default: true
    }
});

const activityStore = useActivityStore();
const emit = defineEmits(['edit', 'delete']);

function handleEdit(activity) {
    emit('edit', activity);
}

function handleDelete(id) {
    emit('delete', id);
}

onMounted(() => {
    activityStore.fetchActivities();
});
</script>

<template>
    <div class="activities-list">
        <LoadingSpinner v-if="activityStore.loading" />
        <div v-else-if="activityStore.error" class="error-message">
            {{ activityStore.error }}
        </div>
        <div v-else-if="!activityStore.activities.length" class="empty-state">
            No activities yet
        </div>
        <template v-else>
            <ActivityCard
                v-for="activity in activityStore.activities"
                :key="activity._id"
                :activity="activity"
                :showActions="showActions"
                @edit="handleEdit"
                @delete="handleDelete"
            />
        </template>
    </div>
</template>

<style scoped lang="scss">
.activities-list {
    margin-top: 1rem;
}

.error-message {
    color: #ff4757;
    padding: 1rem;
    background: rgba(255, 71, 87, 0.1);
    border-radius: 4px;
    margin: 1rem 0;
}

.empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}
</style>
