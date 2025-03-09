import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { activities as initialActivities } from '@/data/activities'
import { useUserStore } from './user'

export const useActivityStore = defineStore('activities', () => {
    const activities = ref(initialActivities)
    const userStore = useUserStore()

    const userActivities = computed(() => 
        activities.value.filter(a => a.userId === userStore.currentUser?.id)
    )

    const friendActivities = computed(() => {
        const friends = userStore.currentUser?.friends || []
        return activities.value.filter(a => friends.includes(a.userId))
    })

    function addActivity(activity) {
        activities.value.push({
            id: Math.max(0, ...activities.value.map(a => a.id)) + 1,
            userId: userStore.currentUser.id,
            ...activity
        })
    }

    function updateActivity(id, updates) {
        const index = activities.value.findIndex(a => a.id === id)
        if (index !== -1 && activities.value[index].userId === userStore.currentUser.id) {
            activities.value[index] = { ...activities.value[index], ...updates }
        }
    }

    function deleteActivity(id) {
        const index = activities.value.findIndex(a => a.id === id)
        if (index !== -1 && activities.value[index].userId === userStore.currentUser.id) {
            activities.value.splice(index, 1)
        }
    }

    return {
        activities,
        userActivities,
        friendActivities,
        addActivity,
        updateActivity,
        deleteActivity
    }
})
