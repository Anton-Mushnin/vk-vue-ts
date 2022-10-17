<script setup lang="ts">
import TheWall from "../components/TheWall.vue";


</script>

<template>
  <div>QQ User {{$route.params.id}}</div>
  <TheWall :user_id="($route.params.id as string)"/>
</template>
