<script setup lang="ts">
import type { Friend } from '@/model/User';
import { computed, ref } from 'vue';

// const style = ref('background-color: white');

const props = defineProps<{
  friend: Friend;
}>()

// onMounted(() => {

// })

const style = computed(() => {
  if (props.friend.friendPercent > 0) { return `color: hsl(170, ${props.friend.friendPercent * 73}%, 55%)`}
  return `color: black`;
})

</script>

<template>
  <div class="friend" :style="style">
    <img :src="props.friend.photo" />
    {{props.friend.displayName}} {{props.friend.age}} {{props.friend.friendOfCount}}
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
    /* background-color: hsl(170, 58%, 54%); */
  }

  img {
    margin-right: 10px;
  }

</style>
