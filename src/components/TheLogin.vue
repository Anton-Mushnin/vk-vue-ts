<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';

 
 
 const authStore = useAuthStore();
</script>

<template>
  <div class="login-container">
    <div v-if="authStore.error" class="error-msg">{{authStore.error}}</div>
    <div class="prompt">Для работы приложения необходимо авторизоваться в VK. <br /> Ваши имя пользователя и пароль узнает только VK.</div>
    <button class="auth-button" @click="authStore.tokenRequest">авторизация</button>
  </div>  
</template>

<style scoped>
.login-container {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 15px;
}

.prompt {
  font-weight: 500;
  color: rgb(148, 36, 148);
}
.auth-button {
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
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
}



</style>
