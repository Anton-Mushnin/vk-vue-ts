<script setup lang="ts">
import type { Friend } from '@/model/User';
import { computed, ref } from 'vue';

const props = defineProps<{
  friend: Friend;
}>()


const style = computed(() => {
  if (props.friend.friendOfCount > 1) { return `background-color: rgba(255, 0, 0, ${(props.friend.friendPercent) * 0.3})`}
  return `background-color: white`;
})

</script>

<template>
  <div class="friend" :style="style">
    <img :src="props.friend.photo" />
    <div class="info w100">
      <div>{{props.friend.displayName}}</div>
      <div>{{props.friend.sexString}}</div>
      <div>{{props.friend.ageString}}</div>
    </div>
    <div class="info nowrap">
      <div v-if="props.friend.followersCount">В друзьях у: {{props.friend.followersCount}}</div>
      <div v-else>В друзьях у: (скрыто)</div>
      <div>У {{props.friend.friendOfCount}} из списка</div>
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
    /* background-color: hsl(0, 100%, 79%); */
    /* color: white; */
  }

  .info {
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    font-size: 12px;
    line-height: 15px;
    cursor: pointer;
    /* height: 50px; */
    /* background-color: antiquewhite; */
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
