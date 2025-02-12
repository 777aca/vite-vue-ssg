import type { AppBarLanguageInterface, HomeAppBarOptions } from "@/types";

export const HomeContentTypeOptions = [
  {
    name: "news.newsList",
    label: "最新",
    value: 0,
  },
  { name: "news.notice", label: "公告", value: 1 },
  { name: "news.version", label: "版本", value: 2 },
  { name: "news.secure", label: "安全", value: 3 },
  { name: "news.activity", label: "活动", value: 4 },
];

export const HomeNewsContentTypeOptions = [
  {
    name: "news.newsList",
    label: "最新",
    value: 0,
  },
  { name: "news.homeNotice", label: "公告", value: 1 },
  { name: "news.homeVersion", label: "版本", value: 2 },
  { name: "news.secure", label: "安全", value: 3 },
  { name: "news.homeActivity", label: "活动", value: 4 },
];

// 新闻类型
export const newsTypeEnum = {
  1: "news.notice",
  2: "news.version",
  3: "news.secure",
  4: "news.activity",
};

export const LANGUAGELIST: AppBarLanguageInterface[] = [
  {
    name: "中文简体",
    value: "zh-cn",
    type: 4,
  },
  {
    name: "EN",
    value: "en-us",
    type: 1,
  },
  {
    name: "JA",
    value: "ja-jp",
    type: 2,
  },
];

export const HOME_APP_BAR_LIST: HomeAppBarOptions[] = [
  {
    name: "home.main",
    path: "/",
  },
  {
    name: "home.news",
    path: "/seekAdvice",
  },
  {
    name: "home.user",
    path: "/llluminati",
  },
  {
    name: "home.weapon",
    path: "/weapon",
  },
  {
    name: "home.map",
    path: "/map",
  },
  {
    name: "home.worldView",
    path: "/worldView",
  },
  {
    name: "home.gallery",
    path: "/wallpaper",
  },
];
