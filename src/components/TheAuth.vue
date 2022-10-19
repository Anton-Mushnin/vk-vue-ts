<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/AuthStore';


const authStore = useAuthStore();
const parsedHash = new URLSearchParams(
  window.location.hash.substring(1)
);

if (parsedHash.has("access_token")) {
  authStore.tokenRequestSuccess(parsedHash.get("access_token")!);
  router.push('/');
}


</script>

<template>
  <div v-if="parsedHash.has('error')">{{parsedHash.get("error") ?? ''}}</div>
</template>
