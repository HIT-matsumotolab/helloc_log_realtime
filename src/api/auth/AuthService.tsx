import axios from "axios";
import { UserType } from "../../types/user";
import { API_URL } from "../Client";
class AuthService {
  async login(mail: string, password: string): Promise<UserType> {
    const response = await axios.post(API_URL + "/auth/signin", {
      mail,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("helloc", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("helloc");
  }

  async register(name: string, mail: string, password: string) {
    return await axios.post(API_URL + "/auth/signup", {
      name,
      mail,
      password,
    });
  }

  async getCurrentUser() {
    const userStr = localStorage.getItem("helloc");
    if (userStr) return await JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
