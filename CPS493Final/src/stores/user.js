import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/services/api.service'

export const useUserStore = defineStore('user', () => {
    const currentUser = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const isLoggedIn = computed(() => currentUser.value !== null)
    const isAdmin = computed(() => currentUser.value?.role === 'admin')

    async function login(credentials) {
        try {
            loading.value = true
            error.value = null
            const response = await api.login(credentials)
            currentUser.value = response.user
            localStorage.setItem('token', response.token)
            return true
        } catch (err) {
            error.value = err.message
            return false
        } finally {
            loading.value = false
        }
    }

    function logout() {
        currentUser.value = null
        localStorage.removeItem('token')
    }

    async function register(userData) {
        try {
            loading.value = true
            error.value = null
            const response = await api.register(userData)
            currentUser.value = response.user
            localStorage.setItem('token', response.token)
            return true
        } catch (err) {
            error.value = err.message
            return false
        } finally {
            loading.value = false
        }
    }

    return {
        currentUser,
        isLoggedIn,
        isAdmin,
        error,
        loading,
        login,
        logout,
        register
    }
})
