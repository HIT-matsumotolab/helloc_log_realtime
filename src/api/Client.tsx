import axios from "axios";

export const API_URL = `${process.env.REACT_APP_API_URL}`;
const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
