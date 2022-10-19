<script setup lang='ts'>
  import { ref, watch } from 'vue';
import { User, type VKUser } from '@/model/User';
import { useAuthStore } from '@/stores/AuthStore';
import { useUsersStore } from '@/stores/UsersStore';
import SearchItem from './SearchItem.vue';
import { jsonp } from 'vue-jsonp';

  const searchString = ref('');
  const searchList = ref<User[]>([]);
  const list = ref<HTMLElement>();


  const usersStore = useUsersStore();
  const authStore = useAuthStore();

  watch(searchString, (() => {
    if (searchString.value === '') { 
      searchList.value = []; 
      (list.value as HTMLElement).style.visibility = "hidden";
    } else {
      fetchData();
    }
  }));


  const clickHandle = (user: User) => {
    searchString.value = '';
    usersStore.addUser(user);
  }



  async function fetchData() {
    try {
      const url = 'https://api.vk.com/method/users.search';
      const res = await jsonp(url, {
        q: searchString.value,
        v: '5.131',
        fields: User.VK_FIELDS,
        access_token: authStore.userToken,
      })
      if (res.error) { throw(res.error) }
      if (searchString.value) {
        searchList.value = res.response.items.map((u: VKUser) => new User(u));
        (list.value as HTMLElement).style.visibility = searchList.value.length ? "visible" : "hidden";
      }
    } catch(e: any) {
        console.log(e);
        if (e.error_code === 5 || e.error_code === 1116) {
          authStore.newTokenNeeded();
        }
    }
  }

</script>

<template>
  <div class="input-container">
    <input v-model="searchString" placeholder="name, last name"/>
    <div class="search-list" ref="list">
      <SearchItem @click="clickHandle(user)" v-for="user in searchList" :user="user" :key="user.id" />
    </div> 
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  /* width: 400px; */
  width: 50%;
  min-width: 300px;
  flex-direction: column;
  background-color: antiquewhite;
  margin-left: auto;
  margin-right: auto;
}

.search-list {
  overflow: auto;
  position: absolute;
  top: 30px;
  z-index: 1;
  width: 100%;
  max-height: 500px;
  background-color: white;
  visibility: hidden;
  border-left: 1px solid rgb(148, 36, 148);
  border-right: 1px solid rgb(148, 36, 148);
  border-bottom: 1px solid rgb(148, 36, 148);


  /* display: flex;
  flex-direction: column; */
  /* padding: 5px; */
}

input {
  border-radius: 5px;
  outline: none;
  box-shadow: none;
  border: 0px;
  background-color: rgb(148, 36, 148);
  color: white;
  padding: 5px;
  font-weight: 500;
  letter-spacing: 0.08em;
}

input::placeholder {
    font-weight: bold;
    opacity: .5;
    color: white;
}
</style>
