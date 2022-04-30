import UserApi from "../services/UserApi";
import TestApi from "../services/TestsApi";
import DisciplineApi from "../services/DisciplineApi";
import TermApi from "../services/TermSpi";
import TeacherApi from "../services/TeacherApi";
import CategoryApi from "../services/CategoryApi";
import OAuthApi from "../services/OAuthApi";

export default function useApi() {
  return {
    user: new UserApi(),
    tests: new TestApi(),
    disicplines: new DisciplineApi(),
    terms: new TermApi(),
    teachers: new TeacherApi(),
    categories: new CategoryApi(),
    oauth: new OAuthApi()
  };
} 