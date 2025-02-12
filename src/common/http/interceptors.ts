import { useDefaultStore } from "@/stores";
import { storageGetItem } from "@/utils";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

let store = null;
export const httpRequestInterceptors = (data: InternalAxiosRequestConfig) => {
  // 添加token
  data.headers.Authorization = `${storageGetItem("TOKEN")}`;
  data.headers.zone = `${storageGetItem("LANGUAGE_ZONE")}`;
  return data;
};

/**
 * 响应拦截
 * @param data
 */
export const httpResponseInterceptors = (
  response: AxiosResponse
): AxiosResponse => {
  const { data } = response;
  if (!store) store = useDefaultStore();
  if (store) store.serverTime = new Date(response.headers["date"]).getTime();
  return data;
};
