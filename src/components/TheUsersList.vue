<script setup lang='ts'>
import { useUsersStore } from '@/stores/UsersStore';
import UserItem from './UserItem.vue';



const usersStore = useUsersStore();


</script>

<template>
  <div class="users-list">
    <UserItem v-for="user in usersStore.users" :key="user.id" :user="user" />
  </div>
</template>

<style scoped>
.users-list {
  width: 700px;
  background-color: aquamarine;
  margin-top: 20px;
}
</style>
