export class LoginUser {
  username: string;
  password:string;

  constructor() {
    this.username = "",
    this.password = ""
  }
}

export interface LoginResponce{
  username: string;
  token:string;
}
