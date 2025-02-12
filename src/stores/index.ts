import { defineStore } from "pinia";
import i18n from "@/i18n";
import type { Lang } from "@/types";
import { LANGUAGELIST } from "@/common/staticJson";
import {
  getWindowLocation,
  isBooleanString,
  storageGetItem,
  storageSetItem,
} from "@/utils";
import { ENV_MODE } from "@/common/config";

interface DefaultInterface {
  // 语言
  lang: Lang;
  // 是否手机端
  isPhone: boolean;
  // 视图宽度
  appClientWidth: number;
  // 视图高度
  viewHeight: number;
  //缩放比
  scaleValue: number;
  //home scrollTop
  homeScrollTop: number;
  //home 定位点
  homeScrollToView: string;
  uid: string;
  // home 是否滚动
  homeIsScroll: boolean;
  // 语言类型
  zone: number;
  // 服务器时间
  serverTime: number;
}

export const useDefaultStore = defineStore("defaultStore", {
  state: (): DefaultInterface => {
    return {
      lang: storageGetItem("lang") ? (storageGetItem("lang") as Lang) : "zh-cn",
      isPhone:
        storageGetItem("isPhone") != undefined
          ? isBooleanString(storageGetItem("isPhone"))
          : false,
      appClientWidth: 0,
      homeScrollTop: 0,
      viewHeight: 0,
      scaleValue: 0,
      homeScrollToView: "",
      uid: storageGetItem("UID") ? storageGetItem("UID") : "",
      zone: storageGetItem("LANGUAGE_ZONE")
        ? Number(storageGetItem("LANGUAGE_ZONE"))
        : 1,
      homeIsScroll: true,
      serverTime: 0,
    };
  },
  actions: {
    setLang(lang: Lang, redirect: boolean = false) {
      if (redirect && ENV_MODE != "development") {
        if (lang == "zh-cn") {
          getWindowLocation().href = `${getWindowLocation().origin}`;
        } else {
          getWindowLocation().href = `${getWindowLocation().origin}/${lang}`;
        }
      } else {
        this.lang = lang;
        const langItem = LANGUAGELIST.find((item) => item.value === lang);
        if (langItem) {
          storageSetItem("LANGUAGE_ZONE", langItem.type.toString());
          this.zone = langItem.type;
        }
        storageSetItem("lang", lang);
        i18n.global.locale.value = lang;
      }
    },
    setIsPhone(_isPhone: boolean) {
      const flg = this.isPhone;
      storageSetItem("isPhone", _isPhone.toString());
      if (flg != _isPhone) getWindowLocation().reload();
      this.isPhone = _isPhone;
    },
    setAppClientWidth(width: number) {
      this.appClientWidth = width;
    },
    setViewHeight(width: number) {
      this.viewHeight = width;
    },
    setHomeScrollTop(scrollTop: number) {
      this.homeScrollTop = scrollTop;
    },
    setScaleValue(scaleValue: number) {
      this.scaleValue = scaleValue;
    },
    setHomeScrollToView(scrollToView: string) {
      this.homeScrollToView = scrollToView;
    },
    setUid(uid: string) {
      storageSetItem("UID", uid);
      this.uid = uid;
    },
    setHomeIsScroll(isScroll: boolean) {
      const result = document.body.querySelector(
        ".home-scroll"
      ) as HTMLDivElement;
      if (result) result.style.overflowY = isScroll ? "auto" : "hidden";
      this.homeIsScroll = isScroll;
    },
  },
  getters: {
    getLang: (state): Lang => {
      return state.lang;
    },
    getLangName: (state): string => {
      return LANGUAGELIST.find((item) => item.value === state.lang)?.name;
    },
    getIsPhone: (state) => {
      return state.isPhone;
    },
    getAppClientWidth: (state) => {
      return state.appClientWidth;
    },
    getViewHeight: (state) => {
      return state.viewHeight;
    },
    getHomeScrollTop: (state) => {
      return state.homeScrollTop;
    },
    getScaleValue: (state) => {
      return state.scaleValue;
    },
    getHomeScrollToView: (state) => {
      return state.homeScrollToView;
    },
    getUid: (state) => {
      return state.uid;
    },
  },
});
