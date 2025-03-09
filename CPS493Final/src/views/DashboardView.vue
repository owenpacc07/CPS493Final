<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<template>
  <div class="container">
    <h1>Dashboard</h1>
    <p>Welcome, {{ userStore.currentUser?.name }}</p>
  </div>
</template>