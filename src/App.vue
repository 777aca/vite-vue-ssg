<script setup lang="ts">
import { Lang } from "@/types";
import { ENV_MODE } from "@/common/config/index";
import { onMounted, computed, ref, onBeforeUnmount } from "vue";
import { useDefaultStore } from "@/stores";
import { isPhone, isInWeChatWork, getWindow, getWindowHeight, getWindowWidth, getWindowLocation } from "@/utils";
import AOS from "aos";
import { isHangLongScreen } from "@/utils";
const appRef = ref<HTMLDivElement | null>(null);
const store = useDefaultStore();
const appStyle = computed(() => {
  let height = store.getViewHeight / (14 * store.scaleValue);
  if (!store.getIsPhone && getWindowHeight() > (getWindowWidth() * 4) / 5) height = 1280 / 14;

  return {
    "--app-width": store.getAppClientWidth,
    "--app-view-height": store.getIsPhone && isInWeChatWork() ? "100vh" : height + "rem"
  };
});

// 获取系统默认语言
const getLangs = (): Lang => {
  let list: Lang[] = ["zh-cn", "en-us", "zh-tw", "ja-jp"];
  const str = getWindowLocation().pathname.split("/")[1] as Lang;
  if (str && list.includes(str)) return str;
  const lang = navigator.language.toLowerCase() as Lang;
  const index = list.findIndex((item) => item.includes(lang));
  if (index != -1) {
    return list[index];
  }
  if (ENV_MODE == "production") return "en-us";
  return "en-us";
};

const initApp = () => {
  const isPhoneValue = isPhone();
  // 基准大小
  const baseSize = 14;
  // 当前页面屏幕分辨率相对于 1920宽的缩放比例，可根据自己需要修改
  const scale = document.documentElement.clientWidth / (isPhoneValue ? 750 : 2560);
  const clientHeight = document.documentElement.clientHeight;
  let scaleHeight = 2;
  if (isPhoneValue) scaleHeight = clientHeight / (isHangLongScreen() ? 1624 : 1334);

  const scaleValue = Math.min(scale, 2, scaleHeight);
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize = baseSize * scaleValue + "px";
  // 视口高度
  const viewHeight = getWindowHeight();
  store.setAppClientWidth(appRef.value?.clientWidth || 0);
  store.setViewHeight(viewHeight);
  store.setIsPhone(isPhoneValue);
  store.setScaleValue(scaleValue);
};

onMounted(() => {
  const lang = getLangs();
  console.log("lang:", lang);
  // 设置系统语言
  store.setLang(lang);

  document.documentElement.classList.add(store.getLang);
  document.documentElement.lang = store.getLang;
  initApp();
  AOS.init({ once: false, offset: 0 });
  getWindow().addEventListener("resize", initApp);
});

onBeforeUnmount(() => {
  getWindow().removeEventListener("resize", initApp);
});
</script>

<template>
  <div ref="appRef" class="app" :style="appStyle">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
