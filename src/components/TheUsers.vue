<script setup lang="ts">
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();

</script>

<template>
  <div>
    {{authStore.userToken}}
  </div>
</template>
