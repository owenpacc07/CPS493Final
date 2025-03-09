<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<template>
  <div class="container">
    <h1>Welcome to Fitness Tracker</h1>
    <div v-if="!userStore.isLoggedIn" class="cta">
      <RouterLink to="/login" class="login-btn">Login to Get Started</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
  text-align: center;
}

.cta {
  margin-top: 2rem;
}

.login-btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background-color: darken(#42b983, 10%);
  }
}
</style>