<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useUsersStore } from '@/stores/UsersStore';
import { ref } from 'vue';



const authStore = useAuthStore();
const usersStore = useUsersStore();
const userId = ref('');
const showError = ref(true);


const searchClick = () => {
  showError.value = true;
  usersStore.addUserWithId(userId.value, authStore.userToken);
}



</script>

<template>
  <div class="id-search-container">
    <input @input="showError = false" v-model="userId" placeholder="id or screen name" />
    <button class="search-button" @click="searchClick">add</button>
    <div class="error-message" v-if="usersStore.error && showError">
      {{usersStore.error}}
    </div>
  </div>
</template>

<style scoped>

.id-search-container {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-top: 5px;
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
  width: 100%;
  margin-right: 5px;

}

input::placeholder {
    font-weight: bold;
    opacity: .5;
    color: white;
}

.search-button {
  background-color: rgb(148, 36, 148);
  color: white;
  outline: none;
  box-shadow: none;
  /* width: 50%; */
  /* min-width: 300px; */
  border: 0px;
  padding: 5px;
  font-weight: 500;
  letter-spacing: 0.08em;
  border-radius: 5px;
}

.error-message {
  color: red;
  border-radius: 3px;
  font-size: 10px;
  position: absolute;
  z-index: 1;
  top: 30px;
  right: 130px;
  background-color: antiquewhite;
  /* left: 150px; */
  padding: 2px;
  padding-left: 10px;
  padding-right: 10px;
}

</style>

