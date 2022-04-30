import api from "./api"

export default class OAuthApi {
  authorize(body: any) {
    return api.post(`/oauth/github`, body);
  }
}