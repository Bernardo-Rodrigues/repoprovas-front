import api from "./api"

export default class TeacherApi {
  getAll(search:string, hearders:any) {
    return api.get(`/teachers?search=${search}`, hearders);
  }
}