import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth', {
  state: () => ({
      userToken: localStorage.getItem('VKUserToken') ?? '',
    }),
  actions: {
    tokenRequestSuccess(token: string) {
      this.userToken = token;
      localStorage.setItem('VKUserToken', JSON.stringify(this.userToken));
    }
  }
})
