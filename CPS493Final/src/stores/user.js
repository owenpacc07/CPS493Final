import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)
  
  const users = [
    {
      id: 1,
      username: 'admin',
      name: 'Admin User',
      role: 'admin',
      friends: [2, 3]
    },
    {
      id: 2,
      username: 'john',
      name: 'John Smith',
      role: 'user',
      friends: [3]
    },
    {
      id: 3,
      username: 'sarah',
      name: 'Sarah Johnson',
      role: 'user',
      friends: [2]
    }
  ]

  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function login(username) {
    const user = users.find(u => u.username === username)
    if (user) {
      currentUser.value = user
      return true
    }
    return false
  }

  function logout() {
    currentUser.value = null
  }

  return {
    currentUser,
    users,
    isLoggedIn,
    isAdmin,
    login,
    logout
  }
})
