<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useFriendsStore } from '@/stores/FriendsStore';
import { useUsersStore } from '@/stores/UsersStore';

const friendsStore = useFriendsStore();
const usersStore = useUsersStore();
const authStore = useAuthStore();
</script>

<template>
  <button @click="friendsStore.getAll(usersStore.users, authStore.userToken)">get</button>
  <div v-if="friendsStore.loading">...loading</div>  
  <div v-for="friend in friendsStore.friends" :key="friend.id">
    {{friend.displayName}} {{friend.friendOfCount}}
  </div>
</template>
