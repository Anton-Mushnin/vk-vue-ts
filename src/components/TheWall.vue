<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref } from 'vue';
import { jsonp } from 'vue-jsonp';
import WallItem from './WallItem.vue';

const authStore = useAuthStore();
const items = ref();
const props = defineProps<{
  user_id: string;
}>()

onMounted(() => {
  fetchNotes();
})

async function fetchNotes() {
  try {
    const url = 'https://api.vk.com/method/wall.get';
    const res = await jsonp(url, {
      owner_id: props.user_id,
      v: '5.131',
      access_token: authStore.userToken,
    })
    if(res.response) {
      items.value = res.response.items;
    }
  } catch(error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="posts-container">
    <WallItem v-for="item in items" :item="item" :key="item.id" />
  </div>
</template>

<style scoped>
  .posts-container {
    display: flex;
    flex-direction: column;
    height: 1000px;
    overflow: auto;
  }
</style>
