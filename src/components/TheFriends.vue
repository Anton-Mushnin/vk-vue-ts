<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useFriendsStore } from '@/stores/FriendsStore';
import { useUsersStore } from '@/stores/UsersStore';
import FriendItem from './FriendItem.vue';

const friendsStore = useFriendsStore();
const usersStore = useUsersStore();
const authStore = useAuthStore();
const showClick = () => {
  friendsStore.getAll(usersStore.users, authStore.userToken)
  .catch((e) => {
    if (e.error_code === 5 || e.error_code === 1116) {
      authStore.newTokenNeeded();
    }
  });
}


</script>

<template>
  <div class="container">
    <button 
      class="show-button" 
      @click="showClick"
    >
      <div v-if="friendsStore.loading">{{`...loading - ${friendsStore.friends.length} items done`}}</div>
      <div v-else-if="friendsStore.friendsLoaded !== 100">{{`...counting friends - ${Math.round(friendsStore.friendsLoaded)}%`}}</div>
      <div v-else>show friends</div>
    </button>
    <div class="friends-list">
      <FriendItem v-for="friend in friendsStore.friends" :friend="friend" :key="friend.id" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.show-button {
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(148, 36, 148);
  color: white;
  outline: none;
  box-shadow: none;
  width: 50%;
  min-width: 300px;
  border: 0px;
  padding: 5px;
  font-weight: 500;
  letter-spacing: 0.08em;
  border-radius: 5px;
  margin-bottom: 30px;
  cursor: pointer;
}

.friends-list {
  margin-top: 20px;
  padding: 10px;
  overflow: auto;
  height: 90vh;
}
</style>
