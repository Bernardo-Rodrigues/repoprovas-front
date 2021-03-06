import api from "./api"

export default class UserApi {
  signUp(data: any) {
    return api.post("/users/sign-up", data);
  }
  signIn(data: any) {
    return api.post("/users/sign-in", data);
  }
}