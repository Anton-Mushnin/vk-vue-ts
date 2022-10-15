import { defineStore } from "pinia";
import { Friend, type User } from '../model/User';
import { useAuthStore } from "./AuthStore";
import { useUsersStore } from "./UsersStore";

const friends = new Array<Friend>;
// const authStore = useAuthStore();
// const usersStore = useUsersStore();
export const useFriendsStore = defineStore('friends', {
  state: () => ({
    friends,
    loading: false,
    error: '',
  }),
  actions: {
    async getAll(forUsers: User[], token: string) {
      this.loading = true;
      this.friends = [];
      for (const user of forUsers) {
        try {
          const res = await fetch(`https://api.vk.com/method/friends.get?user_id=${user.id}&v=5.131&fields=${Friend.VK_FIELDS}&access_token=${token}`);
          const json = await res.json();
          for (const item of json.response.items) {
            const friend = this.friends.find((f) => f.id === item.id);
            if (friend) {
              friend.friendOfCount += 1; 
            } else {
              this.friends.push(new Friend(item.id, item.photo, item.first_name, item.last_name, item.sex, item.followers_count, item.bdate));
            }
          }
        } catch(error) {
          console.log(error);
        }
      }
      this.loading = false;
    }
  }
})



