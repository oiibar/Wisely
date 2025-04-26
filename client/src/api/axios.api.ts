import axios from "axios";
import { getToken } from "@helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: "http://localhost:10000/api",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// https://wisely-production.up.railway.app/api
// https://wisely-serv.onrender.com/api