<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const props = defineProps<{
  user_id: string;
}>()

onMounted(() => {
  fetchNotes();
})

async function fetchNotes() {
  try {
    const res = await fetch(
      `https://api.vk.com/method/wall.get?owner_id=${props.user_id}&v=5.131&access_token=${authStore.userToken}&count=5`
    )
    const json = await res.json();
    console.log(json);
  } catch(error) {
    console.log(error);
  }
}
</script>

<template>
  Notes
  <!-- {{authStore.userToken}} -->
</template>
