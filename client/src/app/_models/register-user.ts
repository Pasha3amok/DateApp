export class RegisterUser {
  username: string;
  password:string;
  token?:string;

  constructor(){
    this.username = "",
    this.password = "",
    this.token = ""
  }
}
