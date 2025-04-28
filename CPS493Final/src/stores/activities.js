import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/services/api.service'

export const useActivityStore = defineStore('activities', () => {
    const activities = ref([])
    const friendActivities = ref([])
    const error = ref(null)
    const loading = ref(false)

    async function fetchActivities() {
        try {
            console.log('Store: Fetching activities');
            loading.value = true
            const data = await api.getActivities();
            console.log('Store: Received activities:', data);
            activities.value = data;
        } catch (err) {
            console.error('Store: Error fetching activities:', err);
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    async function addActivity(activity) {
        try {
            loading.value = true
            const newActivity = await api.createActivity(activity)
            activities.value.push(newActivity)
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    async function fetchFriendActivities() {
        try {
            loading.value = true
            friendActivities.value = await api.getFriendActivities()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    async function updateActivity(id, updates) {
        try {
            loading.value = true
            const updated = await api.updateActivity(id, updates)
            const index = activities.value.findIndex(a => a._id === id) // Change from id to _id
            if (index !== -1) {
                activities.value[index] = updated
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    async function deleteActivity(id) {
        try {
            loading.value = true
            await api.deleteActivity(id)
            activities.value = activities.value.filter(a => a._id !== id) // Change from id to _id
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        activities,
        friendActivities,
        error,
        loading,
        fetchActivities,
        addActivity,
        fetchFriendActivities,
        updateActivity,
        deleteActivity
    }
})
