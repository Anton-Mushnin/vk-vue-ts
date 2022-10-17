<script setup lang="ts">
import TheUsers from "../components/TheUsers.vue";
import TheFriends from "../components/TheFriends.vue";
import { useAuthStore } from "@/stores/AuthStore";


const authStore = useAuthStore();
</script>


<template>
  <main>
    <div class="users-container">
      <a v-if="!authStore.userToken" href="https://oauth.vk.com/authorize?client_id=51451394&display=page&redirect_uri=https://anton-mushnin.github.io/vk-vue-ts/auth&scope=friends&response_type=token&v=5.131&state=123456">
        login
      </a>
      <TheUsers />
      <TheFriends />
    </div>
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
