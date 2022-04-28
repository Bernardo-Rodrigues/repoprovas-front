import api from "./api"

export default class CategoryApi {
  getAll(headers:any) {
    return api.get(`/categories`, headers);
  }
}