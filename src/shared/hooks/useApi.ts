import UserApi from "../services/UserApi";
import TestApi from "../services/TestsApi";

export default function useApi() {
  return {
    user: new UserApi(),
    tests: new TestApi()
  };
} 