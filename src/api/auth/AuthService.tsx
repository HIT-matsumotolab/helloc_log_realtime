import axios from "axios";
import { User } from "../../types/user";
import { API_URL } from "../Client";
class AuthService {
  async login(mail: string, password: string): Promise<User> {
    const response = await axios.post(API_URL + "/auth/signin", {
      mail,
      password,
    });
    console.log(response);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name: string, mail: string, password: string) {
    return axios.post(API_URL + "/signup", {
      name,
      mail,
      password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
