<script setup>
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import StatsDisplay from '@/components/stats/StatsDisplay.vue'
import ActivityList from '@/components/activities/ActivityList.vue'
import { useActivityStore } from '@/stores/activities'

const userStore = useUserStore()
const activityStore = useActivityStore()

onMounted(async () => {
  if (userStore.isAdmin) {
    await userStore.fetchUsers()
  }
})
</script>

<template>
  <div class="container">
    <template v-if="userStore.isLoggedIn">
      <h1>Welcome, {{ userStore.currentUser?.name }}</h1>
      <div class="dashboard">
        <StatsDisplay />
        <div class="recent-activities">
          <h2>Recent Activities</h2>
          <ActivityList :showActions="false" />
        </div>
      </div>
    </template>
    <template v-else>
      <h1>Welcome to Fitness Tracker</h1>
      <div class="cta">
        <RouterLink to="/login" class="login-btn">Login to Get Started</RouterLink>
      </div>
    </template>
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
  background-color: #FF7D00;
  color: #FFECD1;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background-color: darken(#FF7D00, 10%);
  }
}

.dashboard {
  margin-top: 2rem;
}

h1 {
  color: #FF7D00;
  margin-bottom: 2rem;
}

h2 {
  color: #FF7D00;
  margin: 2rem 0 1rem;
}

.recent-activities {
  margin-top: 2rem;
}
</style>