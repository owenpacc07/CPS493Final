<template>
  <div id="app">
    <h1>Hello Vue!</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
@import './assets/styles/main.css';
</style>