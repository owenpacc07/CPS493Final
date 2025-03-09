<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  console.log('App component mounted')
  console.log('UserStore state:', userStore)
})
</script>

<template>
  <main>
    <nav class="container">
      <RouterLink to="/">Home</RouterLink>
      <template v-if="!userStore.isLoggedIn">
        <RouterLink to="/login">Login</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/activities">Activities</RouterLink>
        <RouterLink to="/friends">Friends</RouterLink>
        <template v-if="userStore.isAdmin">
          <RouterLink to="/admin">Admin</RouterLink>
        </template>
        <button @click="userStore.logout" class="logout-btn">Logout</button>
      </template>
    </nav>

    <RouterView />
  </main>
</template>

<style lang = "scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} 

.container {
  max-width: 1100px;
  margin: 0 auto;
}

nav {
  padding: 1rem 0;
  display: flex;
  gap: 1rem;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;

    &.router-link-active {
      color: #42b983;
    }
  }
}

.logout-btn {
  margin-left: auto;
  padding: 0.5rem 1rem;
  border: none;
  background: #ff4757;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #ff6b81;
  }
}
</style>
