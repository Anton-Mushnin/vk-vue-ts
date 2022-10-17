<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/AuthStore';


console.log(window.location.hash);
const authStore = useAuthStore();
const parsedHash = new URLSearchParams(
  window.location.hash.substring(1)
);

if (parsedHash.has("access_token")) {
  authStore.tokenRequestSuccess(parsedHash.get("access_token")!);
  router.push('/');
}
// console.log(parsedHash.get("access_token")); // any_value


</script>

<template>
  <div v-if="parsedHash.has('error')">{{parsedHash.get("error") ?? ''}}</div>
</template>
