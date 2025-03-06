import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    workouts: [],
    exercises: [],
    progress: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addWorkout(state, workout) {
      state.workouts.push(workout);
    },
    setExercises(state, exercises) {
      state.exercises = exercises;
    },
    updateProgress(state, progress) {
      state.progress = progress;
    }
  },
  actions: {
    fetchUser({ commit }, userId) {
      // Fetch user data from an API and commit to state
    },
    logWorkout({ commit }, workout) {
      commit('addWorkout', workout);
    },
    fetchExercises({ commit }) {
      // Fetch exercises from an API and commit to state
    },
    fetchProgress({ commit }, userId) {
      // Fetch progress data from an API and commit to state
    }
  },
  getters: {
    getUser: (state) => state.user,
    getWorkouts: (state) => state.workouts,
    getExercises: (state) => state.exercises,
    getProgress: (state) => state.progress
  }
});

export default store;