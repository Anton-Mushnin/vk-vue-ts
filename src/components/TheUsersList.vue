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
  margin-top: 20px;
  border-right: 1px solid gray;
  height: 100%;
  padding: 10px;
  overflow: auto;
  height: 90vh;
  /* background-color: antiquewhite; */
}
</style>
