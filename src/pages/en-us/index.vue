<script lang="ts" setup>
import AOS from "aos";
import AppBar from "@/components/AppBar/index.vue";
import MainView from "@/components/home/MainView/index.vue";
import { useDefaultStore } from "@/stores";
import { computed, ref } from "vue";
import { getWindow, routerPush } from "@/utils";
import { HomeAppBarOptions } from "@/types";
import { ElScrollbar } from "element-plus";
import { useRouter } from "vue-router";
import { usePageHead } from "@/utils/usePageHead";
usePageHead("en-us");
const store = useDefaultStore();
const appBarSelectPath = ref<string>("/");
const appBarType = ref<"defalut" | "black">("defalut");
const showLogo = ref<boolean>(true);
const compontentRef = ref([]);
const elScrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const aAppBarRef = ref<InstanceType<typeof AppBar>>();
const viewList = computed(() => {
  const list = [
    {
      name: "home.main",
      path: "/",
      component: MainView,
      phoneAppberType: "defalut"
    },
    {
      name: "home.news",
      path: "/seekAdvice",
      component: MainView,
      phoneAppberType: "black"
    }
  ];
  return list.map((item, index) => {
    return {
      ...item,
      getDom: () => compontentRef.value[index]?.$el,
      getRef: () => compontentRef.value[index],
      getDomOffsetTop: () => {
        return compontentRef.value[index]?.$el.offsetTop;
      }
    };
  });
});
const router = useRouter();

const tabChange = (data: HomeAppBarOptions) => {
  router.push("/news");
  appBarSelectPath.value = data.path;
  if (store.getIsPhone) {
    const index = viewList.value.findIndex((item) => item.path === data.path);
    if (index != -1) {
      // setTimeout(() => {
      //     swiperRef.value.update();
      //     swiperRef.value.slideTo(index);
      // }, 500);
    }
  } else {
    toView(data.path);
  }
};

const toView = (path: string) => {
  const result = viewList.value.find((item) => item.path === path);
  if (!result) return;
  elScrollbarRef.value.scrollTo({
    top: result.getDomOffsetTop() - (document.querySelector(".appBarBlackHeight")?.clientHeight || 0),
    behavior: "smooth"
  });
};

// 根据 位置 滚动位置获取对应名字

const getScrollTopToViewPath = (scrollTop: number) => {
  const newScrollTop = scrollTop + 150;
  for (let index = 0; index < viewList.value.length - 1; index++) {
    if (index == viewList.value.length - 1) break;
    const now = viewList.value[index].getDomOffsetTop();
    const next = viewList.value[index + 1]?.getDomOffsetTop();
    if (newScrollTop >= now && newScrollTop < next) {
      return viewList.value[index].path;
    }
  }
  return viewList.value[viewList.value.length - 1].path;
};

const scroll = ({ scrollTop }: { scrollTop: number }) => {
  const dom = aAppBarRef.value.$el;
  getWindow().pageYOffset = scrollTop;
  getWindow().scrollY = scrollTop;
  AOS.refresh();
  const path = getScrollTopToViewPath(scrollTop);
  if (path) appBarSelectPath.value = path;
  let opacity = 1 - scrollTop / (viewList.value[1].getDom().offsetTop / 2);
  if (opacity <= 0) {
    showLogo.value = false;
    if (scrollTop + (document.querySelector(".appBarBlackHeight")?.clientHeight || 0) >= viewList.value[1].getDom().offsetTop) {
      dom.style.opacity = "1";
    } else {
      dom.style.opacity = String(Math.abs(opacity));
    }
    appBarType.value = "black";
  } else {
    showLogo.value = true;
    appBarType.value = "defalut";
    dom.style.opacity = String(opacity);
  }
  store.setHomeScrollTop(scrollTop);
};
</script>

<template>
  <div class="home" ref="homeRef">
    <AppBar v-model:value="appBarSelectPath" ref="aAppBarRef" :type="appBarType" @tab-change="tabChange" :show-logo="showLogo" :tab-list="viewList"></AppBar>
    <ElScrollbar view-class="home-view-scroll" wrap-class="home-scroll" ref="elScrollbarRef" max-height="100%" @scroll="scroll" v-if="!store.getIsPhone">
      <div v-for="(item, index) in viewList" :key="index">
        <component :is="item.component" lang="en-us" ref="compontentRef" />
      </div>
      <div class="bottom-bar-view">
        <BottomBar></BottomBar>
      </div>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped src="./index.scss"></style>
