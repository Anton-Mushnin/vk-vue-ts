<script setup lang="ts">
// import { useAuthStore } from '../stores/AuthStore';
import TheUserInput from './TheUserInput.vue';
import TheUsersList from './TheUsersList.vue';
import TheIDSearch from './TheIDSearch.vue';

// const authStore = useAuthStore();


</script>

<template>
  <div>
    <!-- {{authStore.userToken}} -->
    <TheUserInput />
    <TheIDSearch />
    <TheUsersList />
  </div>
</template>
