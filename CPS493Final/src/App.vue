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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} 

body {
  background: #001524;
  color: #FFECD1;
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
    color: #FFECD1;
    font-weight: 500;

    &.router-link-active {
      color: #FF7D00;
    }

    &:hover {
      color: #FF7D00;
    }
  }
}

.logout-btn {
  margin-left: auto;
  padding: 0.5rem 1rem;
  border: none;
  background: #78290F;
  color: #FFECD1;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: lighten(#78290F, 10%);
  }
}

// Add these global styles
.stat-card, .activity-card, .user-card {
  background: #FFECD1 !important;
  color: #001524;
}

button {
  &.primary-btn {
    background: #15616D;
    color: #FFECD1;
    &:hover {
      background: lighten(#15616D, 10%);
    }
  }
  &.accent-btn {
    background: #FF7D00;
    color: #FFECD1;
    &:hover {
      background: lighten(#FF7D00, 10%);
    }
  }
}

h1, h2, h3 {
  color: #FFECD1;
}

input, select, textarea {
  background: #FFECD1;
  color: #001524;
  border: 1px solid #15616D;
}
</style>
