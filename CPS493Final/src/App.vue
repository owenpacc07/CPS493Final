<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'

const isLoggedIn = ref(false) // This will be managed by your auth store
</script>

<template>
  <header>
    <nav class="container">
      <RouterLink to="/">Home</RouterLink>
      <template v-if="!isLoggedIn">
        <RouterLink to="/login">Login</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/activities">Activities</RouterLink>
        <RouterLink to="/friends">Friends</RouterLink>
      </template>
    </nav>
  </header>

  <RouterView />
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
</style>
