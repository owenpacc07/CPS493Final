<template>
  <div class="dashboard">
    <h1 class="title">Fitness Dashboard</h1>
    <section>
      <h2 class="subtitle">Overview</h2>
      <p>Your fitness data will be displayed here.</p>
      <!-- Additional dashboard content can be added here -->
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>