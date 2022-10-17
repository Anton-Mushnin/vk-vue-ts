import { defineStore } from "pinia";
import { Friend, type User, type VKUser } from '../model/User';

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
    async getAll(forUsers: User[], token: string) {
      this.loading = true;
      this.friends = [];
      let maxFriends = 1;
      for (const user of forUsers) {
        try {
          const res = await fetch(`https://api.vk.com/method/friends.get?user_id=${user.id}&v=5.131&fields=${Friend.VK_FIELDS}&access_token=${token}`);
          const json = await res.json();
          if (!json.response) {throw(json) }
          const items: VKUser[] = json.response.items;
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
        } catch(error) {
          console.log(error);
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

      this.friends = this.friends.sort((a, b) => {
        if (a.age > b.age && b.age === -1) { return -1 }
        if (b.age > a.age && a.age === -1) { return 1 }

        return a.age - b.age
      });
    }
  }
})



