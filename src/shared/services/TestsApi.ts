import api from "./api"

export default class TestApi {
  getTests(filter: string, hearders:any) {
    return api.get(`/tests/${filter}`, hearders);
  }
}