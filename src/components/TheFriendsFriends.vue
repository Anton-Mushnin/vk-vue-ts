<script setup lang="ts">
import { Friend, type VKUser } from '@/model/User';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref } from 'vue';
import { jsonp } from 'vue-jsonp';
import FriendShortItem from './FriendShortItem.vue';

const authStore = useAuthStore();
const friends = ref();
const props = defineProps<{
  user_id: string;
}>()

onMounted(() => {
  fetchFriends();
})

async function fetchFriends() {
  try { const url = 'https://api.vk.com/method/friends.get';
    const res = await jsonp(url, {
      v: '5.131',
      access_token: authStore.userToken,
      user_id: props.user_id,
      fields: Friend.VK_FIELDS,
    });

    if (res.error) { throw( res.error) }
    friends.value = new Array<Friend>;
    const items: VKUser[] = res.response.items;
    for (const item of items) {
            if (item.deactivated) { continue; }
            friends.value.push(new Friend(item));
    }
  } catch(error: any) {
    console.log(error);
    if (error.error_code === 5 || error.error_code === 1116) {
      authStore.newTokenNeeded();
    }
  }
}

</script>


<template>
  <div class="friends-container">
    <FriendShortItem v-for="friend in friends" :friend="friend" :key="friend.id" />
  </div>
</template>

<style scoped>
  .friends-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 1000px;
  }
</style>
