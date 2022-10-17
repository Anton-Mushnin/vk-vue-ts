import { defineStore } from "pinia";
import { User } from '../model/User';

const users = new Array<User>;
export const useUsersStore = defineStore('users', {
  state: () => ({
    users,
    error: '',
  }),
  actions: {
    addUser (user: User) {
      if (this.users.some((u: User) => u.id === user.id)) { return }
      this.users.push(user);
    },
    async addUserWithId (id: string, token: string) {
      try {
        this.error = '';
        const res = await fetch(`https://api.vk.com/method/users.get?user_ids=${id}&v=5.131&fields=${User.VK_FIELDS}&access_token=${token}`);
        const json = await res.json();
        if (!json.response.length) { throw('Nothing found') }
        this.addUser(new User(json.response[0]));
      } catch(e) {
        console.log(e);
        this.error = 'not found';
      }
    },
    deleteUser (userId: string) {
      this.users = this.users.filter((u: User) => u.id !== userId);
    }
  }
})
