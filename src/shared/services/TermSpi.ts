import api from "./api"

export default class TermApi {
  getAll(hearders:any) {
    return api.get(`/terms`, hearders);
  }
}