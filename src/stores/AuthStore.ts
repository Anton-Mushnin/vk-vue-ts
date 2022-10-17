import { defineStore } from "pinia";
// import { myAT } from "@/vktoken";

export const useAuthStore = defineStore('auth', {
  state: () => ({
      // myToken: localStorage.getItem('VKUserToken') ?? myAT,
      userToken: '',
    }),
  actions: {
    tokenRequestSuccess(token: string) {
      this.userToken = token;
      localStorage.setItem('VKUserToken', JSON.stringify(this.userToken));
    },
    tokenRequest() {
      window.location.href = 'https://oauth.vk.com/authorize?client_id=51451394&display=page&redirect_uri=https://anton-mushnin.github.io/vk-vue-ts/auth&scope=friends&response_type=token&v=5.131&state=123456';
    },
    newTokenNeeded() {
      this.userToken = '';
    },
  }
})
