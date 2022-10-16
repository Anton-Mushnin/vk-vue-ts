<script setup lang="ts">
import TheUsers from "../components/TheUsers.vue";
import TheFriends from "../components/TheFriends.vue";
</script>

<template>
  <main>
    <div class="users-container">
      <TheUsers />
      <TheFriends />
    </div>
  </main>
</template>


<style scoped>
.users-container {
  width: 100%;
  max-width: 850px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  /* background-color: aliceblue; */
}
</style>
