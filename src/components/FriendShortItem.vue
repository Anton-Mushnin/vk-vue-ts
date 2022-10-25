<script setup lang="ts">
import type { Friend } from '@/model/User';

const props = defineProps<{
  friend: Friend;
}>()

</script>

<template>
  <div class="friend">
    <img :src="props.friend.photo" />
    <div class="info w100">
      <div>{{props.friend.displayName}}</div>
      <div>{{props.friend.sexString}}</div>
      <div>{{props.friend.ageString}}</div>
    </div>
  </div>
</template>


<style scoped>
  .friend {
    padding: 5px;
    padding-left: 10px;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 5px 5px 5px 5px;
    color: black;
  }

  .info {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 15px;

  }

  .w100 {
    width: 100%;
  }

  .nowrap {
    white-space: nowrap;
    text-align: end;
  }

  img {
    margin-right: 10px;
  }

</style>
