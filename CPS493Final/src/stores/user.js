import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)
  
  const users = [
    {
      id: 1,
      username: 'admin',
      name: 'Admin User',
      email: 'admin@fitness.com',
      role: 'admin',
      friends: [2, 3]  // admin is friends with everyone
    },
    {
      id: 2,
      username: 'john',
      name: 'John Smith',
      email: 'john.smith@email.com',
      role: 'user',
      friends: [1, 3]  // Added admin (1) to John's friends
    },
    {
      id: 3,
      username: 'sarah',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      role: 'user',
      friends: [1, 2]  // Added admin (1) to Sarah's friends
    }
  ]

  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const userFriends = computed(() => 
    users.filter(u => currentUser.value?.friends?.includes(u.id))
  )

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

  // Add these functions to handle temporary user updates
  function updateUser(id, updates) {
    const index = users.findIndex(u => u.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates }
    }
  }

  function deleteUser(id) {
    const index = users.findIndex(u => u.id === id)
    if (index !== -1 && users[index].id !== currentUser.value?.id) {
      users.splice(index, 1)
    }
  }

  return {
    currentUser,
    users,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    userFriends,
    updateUser,
    deleteUser
  }
})
