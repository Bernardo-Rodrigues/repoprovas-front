import UserApi from "../services/UserApi";
import AuthApi from "../services/AuthApi"
import TestApi from "../services/TestsApi";

export default function useApi() {
  return {
    user: new UserApi(),
    auth: new AuthApi(),
    tests: new TestApi()
  };
} 