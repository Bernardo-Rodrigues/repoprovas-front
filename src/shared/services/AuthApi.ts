import api from "./api"

export default class AuthApi {
  signIn(data: any) {
    return api.post("/sign-in", data);
  }
}