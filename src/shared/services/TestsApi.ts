import api from "./api"

export default class TestApi {
  getByDiscipline(id: number | undefined, hearders:any) {
    return api.get(`/tests/disciplines/${id}`, hearders);
  }

  getByTeacher(id: number | undefined, hearders:any) {
    return api.get(`/tests/teachers/${id}`, hearders);
  }
}