import api from "./api"

export default class TeacherApi {
  getAll(hearders:any) {
    return api.get(`/teachers`, hearders);
  }
}