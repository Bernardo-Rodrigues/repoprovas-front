import api from "./api"

export default class UserApi {
  signUp(data: any) {
    return api.post("/sign-up", data);
  }
}