import axios, { type AxiosInstance } from "axios";
import {
  httpRequestInterceptors,
  httpResponseInterceptors,
} from "@/common/http/interceptors";
import { BASE_EURL } from "@/common/config/index";
import { useDefaultStore } from "@/stores";
let store = null;

const request: AxiosInstance = axios.create({
  baseURL: BASE_EURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// 添加请求拦截器
request.interceptors.request.use(httpRequestInterceptors, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(httpResponseInterceptors, function (error) {
  // 登陆失效
  if (error.request.status === 401) {
    if (!store) store = useDefaultStore();
    // 清空token
    store.setToken("");
  }
  return Promise.reject(error);
});

export default request;
