<template>
  <div class="profile">
    <h1>User Profile</h1>
    <form @submit.prevent="updateProfile">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="user.name" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" v-model="user.email" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Age</label>
        <div class="control">
          <input class="input" type="number" v-model="user.age" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Weight</label>
        <div class="control">
          <input class="input" type="number" v-model="user.weight" required />
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" type="submit">Update Profile</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      user: {
        name: '',
        email: '',
        age: null,
        weight: null,
      },
    };
  },
  methods: {
    updateProfile() {
      // Logic to update the user profile
      console.log('Profile updated:', this.user);
    },
  },
});
</script>

<style scoped>
.profile {
  padding: 20px;
}
</style>