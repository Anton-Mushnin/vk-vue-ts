import { defineStore } from "pinia";
import { Friend, type User, type VKUser } from '../model/User';
import { jsonp } from 'vue-jsonp';


const friends = new Array<Friend>;
const friendsCountMap = new Map<string,number>();

export const useFriendsStore = defineStore('friends', {
  state: () => ({
    friends,
    loading: false,
    error: '',
    friendsCountMap,
    friendsCount: 1,
  }),
  actions: {
    clear() {
      this.friends = [];
    },

    async getAll(forUsers: User[], token: string) {
      this.loading = true;
      this.friends = [];
      let maxFriends = 1;
      for (const user of forUsers) {
        try {
          const url = 'https://api.vk.com/method/friends.get';
          const res = await jsonp(url, {
            v: '5.131',
            access_token: token,
            user_id: user.id,
            fields: Friend.VK_FIELDS,
          })

          if (res.error) { throw( res.error) }
          const items: VKUser[] = res.response.items;
          for (const item of items) {
            if (item.deactivated) { continue; }
              const count = this.friendsCountMap.get(item.id) ?? 0;
              this.friendsCountMap.set(item.id, count + 1);
              if (count === 0) {
                this.friends.push(new Friend(item));
              } else {
                if (count + 1 > maxFriends) {
                  maxFriends = count + 1;
                }
              }
          }
        } catch(error: any) {
          console.log(error);
          this.error = error.error_msg;
          throw(error);
        }
      }
      this.loading = false;
      
      this.friends.forEach((f: Friend) => {
        f.friendOfCount = friendsCountMap.get(f.id) ?? 1;
        if (f.friendOfCount === 1) { 
          f.friendPercent = 0 
        } else {
          f.friendPercent = f.friendOfCount / maxFriends;
        }
      })
      this.friendsCountMap.clear();

      Friend.prototype.toString = function friendToString() {
        return `${this.lastName} ${this.firstName}`;
      };
      this.friends = this.friends.sort();

    }
  }
})



