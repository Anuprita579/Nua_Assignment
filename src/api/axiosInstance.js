import axios from "axios";
import { API_BASE } from "../constants/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

export default axiosInstance;
