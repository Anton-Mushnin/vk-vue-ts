<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    VK-VUE-TS
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  font-size: 30px;
  width: 100%;
  text-align: center;
}
</style>
