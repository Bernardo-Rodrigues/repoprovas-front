import api from "./api"

export default class TermApi {
  getAll(headers:any) {
    return api.get(`/terms`, headers);
  }
}