import api from "./api"

export default class DisciplineApi {
  getByTerm(id: number, search:string, hearders:any) {
    return api.get(`/disciplines/terms/${id}?search=${search}`, hearders);
  }
}