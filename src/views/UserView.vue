<script setup lang="ts">
import TheWall from "../components/TheWall.vue";
import TheFriendsFriends from "../components/TheFriendsFriends.vue";




</script>

<template>
  <div class="user-container">
    <TheWall :user_id="($route.params.id as string)"/>
    <TheFriendsFriends :user_id="($route.params.id as string)"/>
  </div>
</template>

<style scoped>
  .user-container {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
