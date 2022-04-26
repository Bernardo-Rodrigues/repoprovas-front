import api from "./api"

export default class DisciplineApi {
  getByTerm(id: number, hearders:any) {
    return api.get(`/disciplines/terms/${id}`, hearders);
  }
}