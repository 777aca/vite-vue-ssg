<template>
  <Drawer v-model:value="showDrawer" :width="426">
    <div class="content-box" :style="{ height: `${height}rem` }">
      <div class="logo">
        <img class="logoImg" :src="getLogoUrl(store.getLangName)" alt="" />
      </div>
      <div class="list-box">
        <ElScrollbar min-height="100%">
          <div class="hand-list">
            <div
              class="hand-item flex-center font-family-regular"
              v-for="item in tabList"
              :key="item.name"
              :class="{ 'active-tab': selectPath === item.path }"
              @click="itemClick(item)"
            >
              {{ $in(lang, item.name) }}
            </div>
          </div>
        </ElScrollbar>
      </div>
    </div>
  </Drawer>
</template>

<script lang="ts" setup>
import { HomeAppBarOptions } from "@/types";
import Drawer from "@/components/Drawer/index.vue";
import { onMounted, ref } from "vue";
import { ElScrollbar } from "element-plus";
import { useDefaultStore } from "@/stores";
import { getAssetsFileUrl } from "@/utils";

const store = useDefaultStore();
const showDrawer = ref<boolean>(false);
const emits = defineEmits(["itemClick"]);
const height = ref<number>(100);

onMounted(() => {
  height.value = store.getViewHeight / (14 * store.scaleValue);
});

withDefaults(
  defineProps<{
    selectPath?: string;
    tabList: HomeAppBarOptions[];
  }>(),
  { selectPath: "" }
);
const getLogoUrl = (name: string) => {
  if (name === "EN" || name === "ZH" || name === "TW") {
    return getAssetsFileUrl(`images/common/icon-logo-EN.png`);
  } else {
    return getAssetsFileUrl(`images/common/icon-logo-JA.png`);
  }
};
const itemClick = (item: HomeAppBarOptions) => {
  emits("itemClick", item);
};

const show = () => {
  showDrawer.value = true;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.content-box {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .logo {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 245px;
    .logoImg {
      width: 100%;
    }
  }
  .list-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 220px;
    flex: 1;
    :deep(.el-scrollbar__view) {
      height: 100%;
    }
    .hand-list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .hand-item {
        width: calc(100% - 20px);
        flex: 1;
        // font-family: "S1-Font-CN-Medium";
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 36px;
        &:nth-child(1) {
          margin-top: 29px;
        }
      }
    }

    .active-tab {
      color: #ff773d;
    }
  }
}
</style>
