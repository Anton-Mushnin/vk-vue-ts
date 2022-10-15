import { defineStore } from "pinia";
import type { User } from '../model/User';

const users = new Array<User>;
export const useUsersStore = defineStore('users', {
  state: () => ({
    users,
    addUser (user: User) {
      if (this.users.some((u: User) => u.id === user.id)) { return }
      this.users.push(user);
    },
  })
})
