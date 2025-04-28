import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/services/api.service'

export const useActivityStore = defineStore('activities', () => {
    const activities = ref([])
    const error = ref(null)
    const loading = ref(false)

    const userActivities = computed(() => activities.value)
    const friendActivities = ref([])

    async function fetchActivities() {
        try {
            loading.value = true
            error.value = null
            activities.value = await api.getActivities()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    async function addActivity(activity) {
        try {
            loading.value = true
            error.value = null
            const newActivity = await api.createActivity(activity)
            activities.value.push(newActivity)
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    async function updateActivity(id, updates) {
        try {
            loading.value = true
            error.value = null
            const updated = await api.updateActivity(id, updates)
            const index = activities.value.findIndex(a => a.id === id)
            if (index !== -1) {
                activities.value[index] = updated
            }
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    async function deleteActivity(id) {
        try {
            loading.value = true
            error.value = null
            await api.deleteActivity(id)
            activities.value = activities.value.filter(a => a.id !== id)
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    async function fetchFriendActivities() {
        try {
            loading.value = true
            error.value = null
            friendActivities.value = await api.getFriendActivities()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    return {
        activities,
        userActivities,
        friendActivities,
        error,
        loading,
        fetchActivities,
        addActivity,
        updateActivity,
        deleteActivity,
        fetchFriendActivities
    }
})
