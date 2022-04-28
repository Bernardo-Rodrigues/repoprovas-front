import api from "./api"

export default class DisciplineApi {
  getAll(headers:any) {
    return api.get(`/disciplines`, headers);
  }
  getByTerm(id: number, search:string, headers:any) {
    return api.get(`/disciplines/terms/${id}?search=${search}`, headers);
  }
}