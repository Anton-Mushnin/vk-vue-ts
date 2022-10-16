<script setup lang="ts">
import type { Friend } from '@/model/User';


const props = defineProps<{
  friend: Friend;
}>()

</script>

<template>
  <div class="friend">
    <img :src="props.friend.photo" />
    {{props.friend.displayName}}
  </div>
</template>


<style scoped>
  .friend {
    padding: 5px;
    padding-left: 10px;
    /* border-top: 1px solid gray; */
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 5px 0px 5px 0px;
  }

  img {
    margin-right: 10px;
  }

</style>
