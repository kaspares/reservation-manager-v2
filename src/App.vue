<script setup lang="ts">
import TheHeader from './components/layout/TheHeader.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

authStore.tryLogin();
</script>

<template>
  <div data-theme="dracula">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>