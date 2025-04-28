<script setup>
import { useUserStore } from '@/stores/user'
import { useActivityStore } from '@/stores/activities'
import ActivityForm from '@/components/activities/ActivityForm.vue'
import ActivityList from '@/components/activities/ActivityList.vue'
import StatsDisplay from '@/components/stats/StatsDisplay.vue'
import { ref, onMounted } from 'vue'

const activityStore = useActivityStore()
const editingActivity = ref(null)

async function handleSubmit(activity) {
    try {
        if (editingActivity.value) {
            await activityStore.updateActivity(editingActivity.value._id, activity)
            editingActivity.value = null
        } else {
            await activityStore.addActivity(activity)
        }
        await activityStore.fetchActivities()
    } catch (error) {
        console.error('Activity operation failed:', error)
    }
}

function handleEdit(activity) {
    editingActivity.value = { ...activity }
}

async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this activity?')) return
    try {
        await activityStore.deleteActivity(id)
        await activityStore.fetchActivities()
    } catch (error) {
        console.error('Delete failed:', error)
    }
}

onMounted(async () => {
    await activityStore.fetchActivities();
});
</script>

<template>
    <div class="container">
        <h1>Activities</h1>
        <div class="activity-layout">
            <div class="left-panel">
                <StatsDisplay />
                <div class="form-section">
                    <h2>{{ editingActivity ? 'Edit Activity' : 'Add New Activity' }}</h2>
                    <ActivityForm 
                        :activity="editingActivity || {}"
                        @submit="handleSubmit"
                    />
                </div>
            </div>
            <div class="right-panel">
                <h2>Activity History</h2>
                <div class="activities-list">
                    <div v-for="activity in activityStore.userActivities" 
                        :key="activity.id" 
                        class="activity-card"
                    >
                        <div class="activity-header">
                            <h3>{{ activity.type }}</h3>
                            <div class="activity-actions">
                                <button @click="handleEdit(activity)" class="edit-btn">Edit</button>
                                <button @click="handleDelete(activity.id)" class="delete-btn">Delete</button>
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
            </div>
            <div class="right-panel">
                <h2>Activity History</h2>
                <ActivityList
                    @edit="handleEdit"
                    @delete="handleDelete"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.activity-layout {
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
}

h1, h2 {
    color: #FF7D00;
    margin-bottom: 1rem;
}

.form-section {
    margin-top: 2rem;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    h3 {
        color: #FF7D00;  // Add this line
    }
}

.activity-actions {
    display: flex;
    gap: 0.5rem;
}

.edit-btn, .delete-btn {
    padding: 0.3rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.edit-btn {
    background: #15616D;
    color: #FFECD1;
}

.delete-btn {
    background: #78290F;
    color: #FFECD1;
}

.activity-title h3 {
    color: #15616D;
}

.activity-details {
    p {
        margin: 0.5rem 0;
        color: #001524;  // Change back to dark color for better readability
    }
}

.activity-section {
    margin: 2rem 0;

    h2 {
        color: #FF7D00;
        margin-bottom: 1rem;
    }
}
</style>