import { defineStore } from "pinia";
import { User } from '../model/User';
import { jsonp } from 'vue-jsonp';

const users = new Array<User>;

export const useUsersStore = defineStore('users', {
  state: () => ({
    users,
    error: '',
    error_code: 0,
  }),
  actions: {
    addUser (user: User) {
      if (this.users.some((u: User) => u.id === user.id)) { return }
      this.users.push(user);
    },
    async addUserWithId (id: string, token: string) {

      try {
        this.error = '';
        const url = `https://api.vk.com/method/users.get`;
        const res = await jsonp(url, {
          user_ids: id,
          access_token: token,
          fields: User.VK_FIELDS,
          v: '5.131',
        })
        if (res.error) { throw(res.error)}
        if (!res.response.length) { throw('Nothing found') }
        this.addUser(new User(res.response[0]));
      } catch(error: any) {
        console.log(error);
        this.error = 'user not found';
        this.error_code = error.error_code;
        throw(error);
      }
    },
    deleteUser (userId: string) {
      this.users = this.users.filter((u: User) => u.id !== userId);
    }
  }
})
