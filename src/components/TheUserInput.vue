<script setup lang='ts'>
  import { ref, watch } from 'vue';
import { User, type VKUser } from '@/model/User';
import { useAuthStore } from '@/stores/AuthStore';
import { useUsersStore } from '@/stores/UsersStore';

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
      const res = await fetch(
        `https://api.vk.com/method/users.search?q=${searchString.value}&v=5.131&fields=${User.VK_FIELDS}&access_token=${authStore.userToken}`
      )
      const json = await res.json();

      if (json.error) { throw(json.error) }
      searchList.value = json.response.items.map((u: VKUser) => new User(u));
      (list.value as HTMLElement).style.visibility = searchList.value.length ? "visible" : "hidden";
    } catch(e: any) {
        console.log(e);
        if (e.error_code === 5) {
          console.log('token problem');
        }
    }
  }

</script>

<template>
  <div class="input-container">
    <input v-model="searchString" placeholder="type here..."/>
    <div class="search-list" ref="list">
      <div @click="clickHandle(user)" v-for="user in searchList" :key="user.id">
        <img :src="user.photo" />
        {{`${user.displayName}`}}
      </div>
    </div> 
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  width: 400px;
  flex-direction: column;
  background-color: antiquewhite;
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
}
</style>
