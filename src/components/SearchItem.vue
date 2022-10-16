<script setup lang="ts">
import type { User } from '@/model/User';


const props = defineProps<{
  user: User;
}>()

</script>

<template>
  <div class="user">
    <img :src="props.user.photo" />
    {{props.user.displayName}}
  </div>
</template>


<style scoped>
  .user {
    /* padding: 5px; */
    /* padding-left: 10px; */
    /* border-top: 1px solid gray; */
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 5px 5px 5px 5px;
    cursor: pointer;
  }

  img {
    margin-right: 10px;
  }
</style>
