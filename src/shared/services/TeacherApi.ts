import api from "./api"

export default class TeacherApi {
  getAll(search:string, headers:any) {
    return api.get(`/teachers?search=${search}`, headers);
  }
  getByDiscipline(disciplineName:string, headers:any) {
    return api.get(`/teachers/disciplines/${disciplineName}`, headers);
  }
}