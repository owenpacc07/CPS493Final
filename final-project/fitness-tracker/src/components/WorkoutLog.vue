<template>
  <div class="workout-log">
    <h2>Workout Log</h2>
    <form @submit.prevent="logWorkout">
      <div class="field">
        <label class="label">Workout Type</label>
        <div class="control">
          <input type="text" v-model="workoutType" class="input" placeholder="Enter workout type" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Duration (minutes)</label>
        <div class="control">
          <input type="number" v-model="duration" class="input" placeholder="Enter duration" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Date</label>
        <div class="control">
          <input type="date" v-model="date" class="input" required />
        </div>
      </div>
      <div class="control">
        <button type="submit" class="button is-primary">Log Workout</button>
      </div>
    </form>
    <div class="log">
      <h3>Logged Workouts</h3>
      <ul>
        <li v-for="(workout, index) in workouts" :key="index">
          {{ workout.date }}: {{ workout.type }} for {{ workout.duration }} minutes
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'WorkoutLog',
  setup() {
    const workoutType = ref('');
    const duration = ref(0);
    const date = ref('');
    const workouts = ref<{ type: string; duration: number; date: string }[]>([]);

    const logWorkout = () => {
      workouts.value.push({ type: workoutType.value, duration: duration.value, date: date.value });
      workoutType.value = '';
      duration.value = 0;
      date.value = '';
    };

    return {
      workoutType,
      duration,
      date,
      workouts,
      logWorkout,
    };
  },
});
</script>

<style scoped>
.workout-log {
  margin: 20px;
}
</style>