class User {
  public static VK_FIELDS = 'photo,first_name,last_name';
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
  displayName: string;
  constructor(id: string, photo: string, firstName: string, lastName: string) {
    this.id = id;
    this.photo = photo;
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = `${firstName} ${lastName}`;
  }

}

class Friend extends User {
  public static VK_FIELDS = 'photo,first_name,last_name,sex,followers_count,bdate';
  sex: number;
  followersCount: number;
  birthDate: string;
  friendOfCount: number;
  constructor(id: string, photo: string, firstName: string, lastName: string, sex: number, followersCount: number, birthDate: string) {
    super(id, photo, firstName, lastName);
    this.sex = sex;
    this.followersCount = followersCount;
    this.birthDate =birthDate;
    this.friendOfCount = 1;
}
}


interface VKUser { id: string; photo: string; first_name: string; last_name: string; }


export {User, Friend, type VKUser};
