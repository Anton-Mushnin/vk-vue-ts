enum Genders {
  'Женщина'= 1,
  'Мужчина' = 2,
}



class User {
  public static VK_FIELDS = 'photo,first_name,last_name';
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
  constructor(vkUser: VKUser) {
    this.id = vkUser.id;
    this.photo = vkUser.photo;
    this.firstName = vkUser.first_name;
    this.lastName = vkUser.last_name;
  }

  get displayName(): string {
    return `${this.firstName} ${this.lastName}`;
  }



}

class Friend extends User {
  public static VK_FIELDS = 'photo,first_name,last_name,sex,followers_count,bdate';
  sex: number;
  followersCount: number;
  birthDate: string;
  friendOfCount: number;
  friendPercent = 0;
  age: number;
  constructor(vkUser: VKUser) {
    super(vkUser);
    this.sex = vkUser.sex;
    this.followersCount = -2;
    this.birthDate = vkUser.bdate; //D'M'.YYYY
    this.friendOfCount = 1;
    this.age = this.calcAge();
  }

  calcAge(): number {
    if (!this.birthDate || this.birthDate.length < 8) return -1;
    const [date, month, year]: number[] = this.birthDate.split('.').map((s) => parseInt(s));
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const nowDate = now.getDate();
    if (month < nowMonth || (month === nowMonth && date < nowDate)) {
      return nowYear - year
    } return nowYear - year - 1;
  }

  get ageString(): string {

    if (this.age < 0) {return '';}
    const words = ['лет','год','года','года','года','лет','лет','лет','лет','лет'];
    const lastDigit = parseInt(this.age.toString().slice(-1));
    return `${this.age} ${words[lastDigit]}`
  }





  get sexString(): string {
    const gender = Genders[this.sex];
    return gender ? gender : '';
  }

}


interface VKUser { deactivated: string, id: string; photo: string; first_name: string; last_name: string; sex: number, followers_count: number, bdate: string}


export {User, Friend, type VKUser};
