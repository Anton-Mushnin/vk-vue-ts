import { defineStore } from "pinia";
import { Friend, type User, type VKUser } from '../model/User';
import fetchJsonp from 'fetch-jsonp';

const friends = new Array<Friend>;
const friendsCountMap = new Map<string,number>();

export const useFriendsStore = defineStore('friends', {
  state: () => ({
    friends,
    loading: false,
    error: '',
    friendsCountMap,
    friendsCount: 1,
    friendsLoaded: 100,
  }),
  actions: {
    clear() {
      this.friends = [];
      this.friendsLoaded = 100;
    },
    async countFriends(token: string) {
      this.friendsLoaded = 0;
      let count = 0;
      for (let i = 0; i < this.friends.length; i += 1) {
        const user = this.friends[i];
        const url = `https://api.vk.com/method/friends.get?v=5.131&access_token=${token}&user_id=${user.id}`;
        const res = await fetchJsonp(url)
        .then(function(response) {
          return response.json()
        }).catch(function(ex) {
          console.log('parsing failed', ex)
          return {...ex, retry: true};
        })
        if (res.retry) {
          await wait(2000);
          i = i - 1;
          continue;
        }
        if (this.friends.length > 0) {
          this.friendsLoaded = ((i + 1) / this.friends.length) * 100;
        }
        if (res.response) { 
          user.followersCount = res.response.count 
        } else {
          if(res.error) {
            if (res.error.error_code !== 30){
              console.log(res.error);
              user.followersCount = -3;
            } else {
              user.followersCount = -1;
            }
          }
        }
        count += 1;
        if (count === 3) {
          await wait(1001);
          count = 0;
        }
      }

    },

    async getAll(forUsers: User[], token: string) {
      this.loading = true;
      this.friends = [];
      let maxFriends = 1;
      for (const user of forUsers) {
        try {
          const url = `https://api.vk.com/method/friends.get?v=5.131&access_token=${token}&user_id=${user.id}&fields=${Friend.VK_FIELDS}`;
          const res = await fetchJsonp(url)
          .then(function(response) {
            return response.json()
          }).catch(function(ex) {
            console.log('parsing failed', ex)
            return ex;
          })

          if (res.error) { throw( res.error) }
          if (!res.response) { throw('no response') }
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
      this.countFriends(token);

    }
  }
})


function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, ms);
  })
}



