import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
      userToken: localStorage.getItem('VKUserToken') ?? '',
      error: '',
    }),
  actions: {
    tokenRequestSuccess(token: string) {
      this.userToken = token;
      localStorage.setItem('VKUserToken', JSON.stringify(this.userToken));
    },
    tokenRequest() {
      window.location.href = 'https://oauth.vk.com/authorize?client_id=51451394&display=page&redirect_uri=https://anton-mushnin.github.io/vk-vue-ts/&scope=friends&response_type=token&v=5.131&state=123456';
    },
    newTokenNeeded() {
      this.userToken = '';
    },
  }
})
