import { messages } from "@/i18n";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw, Router } from "vue-router";
import type { Lang, ReservationPrizesHttpResult } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { ENV_STATIC_URL } from "@/common/config/index";
import { useDefaultStore } from "@/stores";
import { inject } from "vue";

/**
 * 判断是否是IOS客户端
 */
export const isIOS = () => {
  const ua = getWindow().navigator.userAgent || "";
  return !!ua.match(/iPhone/i);
};

/**
 * 判断是否是安卓客户端
 */
export const isAndroid = () => {
  const ua = getWindow().navigator.userAgent || "";
  return !!ua.match(/(Android);?[\s/]+([\d.]+)?/i);
};

/**
 * 判断是否是移动端
 */
export const isPhone = () => {
  return isAndroid() || isIOS() || getWindow().innerWidth <= 900;
};

/**
 * 获取语言文本
 * @param name
 * @param data
 * @returns
 */
export const getLocaleText = (name: string, data: { locale: string }) => {
  return messages[data.locale][name] || "";
};

/**
 * 获取资源文件地址
 * @param url
 * @returns
 */

export const getAssetsFileUrl = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};

/**
 * 修改el-successmessage 样式
 * @param msg
 * @returns
 */
export const elSuccessMessage = (msg: string) => {
  return ElMessage.success({
    message: msg,
    customClass: "message-success-custom-class",
    center: true,
  });
};

/**
 * 修改el-errorMessage 样式
 * @param msg
 * @returns
 */
export const elErrorMessage = (msg: string) => {
  return ElMessage.error({
    message: msg,
    customClass: "message-error-custom-class",
    center: true,
    dangerouslyUseHTMLString: true,
  });
};

/**
 * 判断是否是布尔值字符串
 */

export const isBooleanString = (str: string) => {
  if (str === "true") {
    return true;
  }
  return false;
};

// 截取字符串前30
export const getStr = (str: string) => {
  return str.length > 30 ? str.substring(0, 30) + "..." : str;
};

// 替换富文本
export const replaceHtml = (htmlString: string) => {
  // 创建一个 DOMParser 实例并解析 HTML 字符串
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  // 获取整个代码段内的文字内容
  const textContent = doc.body.textContent || doc.body.innerText;
  return textContent;
};

/**
 * 浏览器内复制文本
 * @param text
 * @returns
 */
export const copyTxt = async (text: string) => {
  if (!text) return;
  const input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
};

/**
 * URL为hash模式下获取参数
 * @returns
 */
export const getHashParams = (key?: string) => {
  if (getWindowLocation().hash.indexOf("?") === -1) return "";

  const arrayList = (getWindowLocation().hash || "").split("?");
  const arr = arrayList.length ? arrayList[1].split("&") : [];

  const params = {};
  for (let i = 0, l = arr.length; i < l; i++) {
    const index = arr[i].indexOf("=");
    const _key = arr[i].substring(0, index);
    const _value = decodeURIComponent(arr[i].substring(index + 1));
    params[_key] = _value;
  }
  if (key) {
    return params[key];
  }
  return params;
};

/**
 * 移除URL中的查询参数
 * @param url
 * @param paramToRemove
 * @returns
 */
export const removeQueryParam = (url: string, paramToRemove: string) => {
  const [baseUrl, hash] = url.split("#");
  if (!hash) return url;

  const [path, queryString] = hash.split("?");
  if (!queryString) return url;

  const params = new URLSearchParams(queryString);
  params.delete(paramToRemove);
  const newQueryString = params.toString();

  return `${baseUrl}#${path}${newQueryString ? "?" + newQueryString : ""}`;
};

/**
 * 英文状态下转大写
 * @param str
 * @returns
 */
export const enLanguageToUpperCase = (str: string) => {
  const { t } = useI18n();
  // const store = useDefaultStore();
  // if (store.getLang == "en-us") {
  //   return t(str).toUpperCase();
  // }
  return t(str);
};

/**
 * 根据路由参数跳转
 * @param to 路由
 */
export const routerPush = (to: RouteLocationRaw) => {
  let result: string;
  const params = getHashParams();

  if (typeof to === "string") {
    result = to;
    if (result.includes("?")) {
      Object.keys(params).forEach((key) => {
        result += `&${key}=${params[key]}`;
      });
    } else {
      Object.keys(params).forEach((key, index) => {
        result +=
          index === 0 ? `?${key}=${params[key]}` : `&${key}=${params[key]}`;
      });
    }
  } else if (to.path) {
    result = `${to.path}?${new URLSearchParams({
      ...params,
      ...to.query,
    }).toString()}`;
  }

  const store = useDefaultStore();
  const router = inject<Router>("router"); // 设置类型为 Router
  const lang = store.getLang; // 获取当前语言
  console.log("push", `/${lang}${result}`);
  console.log(result);

  router.push(`/${lang}${result}`);
};

/**
 * 获取奖品名称
 */
export const getPrizeName = (
  data: ReservationPrizesHttpResult,
  config: { language: Lang }
) => {
  if (!data) return "";
  switch (config.language) {
    case "zh-cn":
      return data.name;
    case "en-us":
      return data.name_en;
    case "zh-tw":
      return data.name_tw;
    case "ja-jp":
      return data.name_jp;
    default:
      return data.name;
  }
};

/**
 *
 * @returns 是否是微信
 */
export const isInWeChatWork = () => {
  if (getWindow().navigator.userAgent.indexOf("MicroMessenger") !== -1) {
    return true;
  }
  return false;
};

/**
 * 获取UID
 * @returns
 */
export const getUid = () =>
  storageGetItem("UID") ? storageGetItem("UID") : "";

/**
 *
 * @returns 获取设备id
 */
export const getDeviceId = () => {
  let deviceId = storageGetItem("DEVICE_ID") ? storageGetItem("DEVICE_ID") : "";
  if (!deviceId) {
    deviceId = uuidv4();
    storageSetItem("DEVICE_ID", deviceId);
  }
  return deviceId;
};

/**
 *
 * @returns 获取语言后缀
 */
export const getLan = () => {
  const language = storageGetItem("lang");
  switch (language) {
    case "zh-cn":
      return "ZH";
    case "en-us":
      return "EN";
    case "zh-tw":
      return "TW";
    case "ja-jp":
      return "JA";
    default:
      return "";
  }
};

/**
 *
 * @returns 获取用户邮箱
 */
export const getUserEmail = () => {
  return storageGetItem("USER_EMAIL") || "";
};

/**
 *
 * @returns 设备类型
 */
export const getDeviceType = () => {
  return isAndroid() ? 1 : isIOS() ? 2 : 3;
};

/**
 *
 * @returns 设备信息
 */
export const getDeviceInfo = () => {
  return {
    device_id: getDeviceId(),
    device_type: getDeviceType(),
    utm_source: getHashParams("utm_source"),
    utm_medium: getHashParams("utm_medium"),
    utm_campaign: getHashParams("utm_campaign"),
  };
};

/**
 * 图片预加载
 * @param  urls
 * @returns
 */
export const preloadImages = (urls = []) => {
  if (urls.length === 0) return Promise.resolve();
  const promises = urls.map((url) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        resolve(urls);
      };
      image.onerror = () => {
        resolve(false);
      };
    });
  });

  return Promise.all(promises);
};

/**
 *
 * @returns 是否是长屏
 */
export const isHangLongScreen = () => {
  return getWindow().innerHeight > 667;
};

/**
 *
 * @param url 获取图片地址
 * @returns
 */
export const getServerStaticUrl = (url: string) => {
  if (!url.includes("http") && !url.includes("https")) {
    return `${ENV_STATIC_URL}${url}`;
  }
  return url;
};

/**
 *
 * @param htmlString 更新html img url
 * @returns
 */
export const updateHtmlBodyImgUrl = (htmlString: string) => {
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
  let match;
  // 提取所有匹配的 img 标签和对应的 src 属性值
  const imgTagsWithSrc = [];
  while ((match = imgRegex.exec(htmlString)) !== null) {
    imgTagsWithSrc.push({
      tag: match[0], // 整个 img 标签
      src: match[1], // 图片的 src 属性值
    });
  }

  return htmlString.replace(imgRegex, (match, src) => {
    const url = getServerStaticUrl(src);
    return match.replace(src, url);
  });
};

/**
 * 替换字符串中的所有指定子字符串
 * @param {string} inputStr - 要处理的原始字符串
 * @param {string} target - 需要被替换的子字符串
 * @param {string} replacement - 替换成的字符串
 * @returns {string} - 处理后的字符串
 */
export const replaceAll = (
  inputStr: string,
  target: string,
  replacement: string
) => {
  // 创建一个正则表达式，使用全局匹配标志
  const regex = new RegExp(target, "g");
  // 使用正则表达式进行替换
  return inputStr.replace(regex, replacement);
};

/**
 * 截取字符串
 * @param str
 * @param start 起始位置
 * @param end 结束位置
 * @returns
 */

export const substringFromTo = (str, start, end) => {
  return {
    str: str.substring(start, end),
    more: str.length > end,
  };
};

// utils/storage.js
export const isClient = typeof window !== "undefined";

export const storageGetItem = (key) => {
  if (isClient) {
    return localStorage.getItem(key);
  }
  return null; // 如果是服务端环境，返回 null 或默认值
};

export const storageSetItem = (key, value) => {
  if (isClient) {
    localStorage.setItem(key, value);
  }
};

export const getWindow = () => {
  if (isClient) {
    return window; // 返回浏览器中的 window 对象
  }
  return null; // 如果是 SSR 环境，返回 null
};

// 获取 window.innerHeight
export const getWindowHeight = () => {
  if (isClient) {
    return window.innerHeight;
  }
  return 0; // 如果是服务端环境，返回默认值 0
};

// 获取 window.innerWidth
export const getWindowWidth = () => {
  if (isClient) {
    return window.innerWidth;
  }
  return 0; // 如果是服务端环境，返回默认值 0
};

// 获取 window.location
export const getWindowLocation = () => {
  if (isClient) {
    return window.location;
  }
  return null; // 如果是服务端环境，返回 null
};
