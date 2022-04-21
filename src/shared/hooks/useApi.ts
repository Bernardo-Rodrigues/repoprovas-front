import UserApi from "../services/UserApi";
import AuthApi from "../services/AuthApi"

export default function useApi() {
  return {
    user: new UserApi(),
    auth: new AuthApi()
  };
} 