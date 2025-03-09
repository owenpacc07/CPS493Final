<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function handleLogin(username) {
  if (userStore.login(username)) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="container login-page">
    <h1>Select a User</h1>
    <div class="user-list">
      <button
        v-for="user in userStore.users"
        :key="user.id"
        @click="handleLogin(user.username)"
        class="user-button"
      >
        Login as {{ user.name }}
        <span class="role-badge">{{ user.role }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  padding: 2rem;
  text-align: center;

  h1 {
    margin-bottom: 2rem;
  }
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
}

.user-button {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f5f5f5;
  }
}

.role-badge {
  background: #42b983;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}
</style>