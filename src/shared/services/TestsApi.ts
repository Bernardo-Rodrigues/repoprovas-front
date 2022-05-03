import api from "./api"

export default class TestApi {
  getByDiscipline(id: number | undefined, headers:any) {
    return api.get(`/tests/disciplines/${id}`, headers);
  }

  getByTeacher(id: number | undefined, headers:any) {
    return api.get(`/tests/teachers/${id}`, headers);
  }

  updateViews(id: number | undefined, headers:any) {
    return api.patch(`/tests/${id}/view`, {}, headers);
  }

  postTest(body: any, headers:any) {
    const formData = new FormData();

    for (let key in body) {
      formData.append(key, body[key]);
    }

    return api.post(`/tests`, formData, headers);
  }
}