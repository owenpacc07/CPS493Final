<template>
  <div class="progress">
    <h2>Your Progress</h2>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
    </div>
    <p>{{ progressMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Progress',
  props: {
    progress: {
      type: Number,
      required: true
    },
    goal: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const progressPercentage = computed(() => {
      return (props.progress / props.goal) * 100;
    });

    const progressMessage = computed(() => {
      return `You've completed ${props.progress} out of ${props.goal} units.`;
    });

    return {
      progressPercentage,
      progressMessage
    };
  }
});
</script>

<style scoped>
.progress {
  text-align: center;
}

.progress-bar {
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  height: 20px;
  width: 100%;
}

.progress-fill {
  background-color: #00d1b2; /* Bulma primary color */
  height: 100%;
  transition: width 0.3s ease;
}
</style>