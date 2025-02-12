import http from "@/common/http";
import {
  HttpTotalResult,
  HomeCarouselInterface,
  HomeNewsInterface,
} from "@/types";

/**
 * 根据类型获取轮播图
 * @param data
 */
export const carouselList = (data: {
  page?: number;
  size?: number;
  zone: number;
  type: number;
}): Promise<HttpTotalResult<HomeCarouselInterface>> => {
  return http.post("web/carousel/list", data);
};

/**
 * 根据类型获取轮播图
 * @param data
 */
export const milestone = (
  data = { value: 10086 }
): Promise<{ total: number }> => {
  return http.post("web/milestone", data);
};

/**
 * 内容列表
 * @param data
 * @returns
 */
export const getArticleList = (data: {
  page?: number;
  size?: number;
  zone: number;
  type: number;
  status?: number;
}): Promise<HttpTotalResult<HomeNewsInterface>> => {
  return http.post("web/article/list", data);
};

/**
 * 内容列表带详情
 * @param data
 * @returns
 */
export const getArticleListCon = (data: {
  page?: number;
  size?: number;
  zone: number;
  type: number;
  status?: number;
}): Promise<HttpTotalResult<HomeNewsInterface>> => {
  return http.post("web/article/list/detail", data);
};

/**
 * 内容详情
 * @param data
 * @returns
 */
export const getArticleDetail = (data: {
  id: number;
}): Promise<HomeNewsInterface> => {
  return http.post("web/article/get", data);
};
