import { defineStore } from "pinia";
import { myAT } from "@/vktoken";

export const useAuthStore = defineStore('auth', {
  state: () => ({
      userToken: localStorage.getItem('VKUserToken') ?? myAT,
    }),
  actions: {
    tokenRequestSuccess(token: string) {
      this.userToken = token;
      localStorage.setItem('VKUserToken', JSON.stringify(this.userToken));
    }
  }
})
