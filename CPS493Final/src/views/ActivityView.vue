<script setup>
import { useUserStore } from '@/stores/user'
import { useActivityStore } from '@/stores/activities'
import ActivityForm from '@/components/activities/ActivityForm.vue'
import StatsDisplay from '@/components/stats/StatsDisplay.vue'
import { ref } from 'vue'

const userStore = useUserStore()
const activityStore = useActivityStore()
const editingActivity = ref(null)

function handleSubmit(activity) {
    if (activity.id) {
        activityStore.updateActivity(activity.id, activity)
        editingActivity.value = null
    } else {
        activityStore.addActivity(activity)
    }
}

function handleEdit(activity) {
    editingActivity.value = { ...activity }
}

function handleDelete(id) {
    if (confirm('Are you sure you want to delete this activity?')) {
        activityStore.deleteActivity(id)
    }
}
</script>

<template>
    <div class="container">
        <h1>Activities</h1>
        
        <StatsDisplay />
        
        <ActivityForm 
            :activity="editingActivity || {}"
            @submit="handleSubmit"
        />

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
</style>