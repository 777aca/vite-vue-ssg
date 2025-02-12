import request from "@/common/http/request";
import {AxiosRequestConfig} from "axios";

/**
 * get
 * @param url
 * @param params
 * @param config
 * @returns
 */

const httpGet = <R, T>(url: string, params: T, config?: AxiosRequestConfig<T>) => {
  return request.get<T, R>(url, {params, ...config});
};

/**
 * post
 * @param url
 * @param data
 * @param config
 * @returns
 */
const httpPost = <R, T = unknown>(url: string, data: T, config?: AxiosRequestConfig<T>) => {
  return request.post<T, R>(url, data, config);
};

/**
 * put
 * @param url
 * @param data
 * @param config
 * @returns
 */
const httpPut = <R, T>(url: string, data: T, config?: AxiosRequestConfig<T>) => {
  return request.put<T, R>(url, data, config);
};

/**
 * del
 * @param url
 * @param data
 * @param config
 * @returns
 */
const httpDelete = <R, T>(url: string, data: T, config?: AxiosRequestConfig<T>) => {
  return request.delete<T, R>(url, {data, ...config});
};

export default {
  post: httpPost,
  get: httpGet,
  delete: httpDelete,
  put: httpPut
};
