<script setup lang="ts">
import { useAuthStore } from '../stores/AuthStore';
import TheUserInput from './TheUserInput.vue';

const authStore = useAuthStore();


</script>

<template>
  <div>
    <!-- {{authStore.userToken}} -->
    <TheUserInput />
  </div>
</template>
