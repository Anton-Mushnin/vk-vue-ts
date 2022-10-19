<script setup lang="ts">
import TheUsers from "../components/TheUsers.vue";
import TheFriends from "../components/TheFriends.vue";
import { useAuthStore } from "@/stores/AuthStore";
import router from '@/router';
import TheLogin from '../components/TheLogin.vue';




const authStore = useAuthStore();
// if(authStore.userToken) {
//   authStore.tokenRequestSuccess(authStore.userToken);
// }
// const authStore = useAuthStore();
const parsedHash = new URLSearchParams(
  window.location.hash.substring(1)
);

if (parsedHash.has("access_token")) {
  authStore.tokenRequestSuccess(parsedHash.get("access_token")!);
  router.push('/');
}



</script>


<template>
  <main>
    <TheLogin v-if="!authStore.userToken" />
    <template v-else>
        <div class="users-container">
        <TheUsers />
        <TheFriends />
      </div>
      </template>
  </main>
</template>


<style scoped>
.users-container {
  width: 100%;
  max-width: 900px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  /* background-color: aliceblue; */
}
</style>
