<script setup lang="ts">
import type { User } from '@/model/User';
import { useFriendsStore } from '@/stores/FriendsStore';
import { useUsersStore } from '@/stores/UsersStore';


const usersStore = useUsersStore();
const friendsStore = useFriendsStore();
const props = defineProps<{
  user: User;
}>()

const deleteUserClick = () => {
  usersStore.deleteUser(props.user.id);
  friendsStore.clear();

}

</script>

<template>
  <div class="user">
    <img :src="props.user.photo" />
    {{props.user.displayName}}
    <div @click="deleteUserClick" class="delete-button">delete</div>
  </div>
</template>

<style scoped>
  .user {
    padding: 5px;
    padding-left: 10px;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 5px 5px 5px 5px;
    cursor:default;
  }

  img {
    margin-right: 10px;
  }
  
</style>
