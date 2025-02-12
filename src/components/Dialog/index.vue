<template>
  <AppMask :show="value" @bg-click="bgClick" :z-index="zIndex">
    <div class="flex-center bg-box">
      <div class="dialog-box" :style="getStyle" @click.stop>
        <div class="header-box flex justify-between" :style="getHeaderStyle">
          <slot name="title-text">
            <div class="title-name font-family-regular" :style="titleStyle">
              {{ title }}
            </div>
          </slot>
          <div class="icon-close" @click="close" v-if="showClose"></div>
        </div>

        <slot name="title-line">
          <!-- <img
            class="title-line"
            src="@/assets/images/common/dialog-title-line.png"
          /> -->
        </slot>

        <div class="content-box" :style="getContentStyle">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </AppMask>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from "vue";
import AppMask from "@/components/AppMask/index.vue";
import { useDefaultStore } from "@/stores";
const emits = defineEmits(["update:value", "close", "bgClick"]);
const store = useDefaultStore();
const props = withDefaults(
  defineProps<{
    value: boolean;
    title?: string;
    minWidth?: number | string;
    width?: number | string;
    minHeight?: number | string;
    bgIsClose?: boolean;
    headerStyle?: {
      [key: string]: string;
    };
    contentStyle?: {
      [key: string]: string;
    };
    showClose?: boolean;
    titleStyle?: {
      [key: string]: string;
    };
    autoClose?: boolean;
    zIndex?: number;
  }>(),
  {
    showClose: true,
    minWidth: 740,
    minHeight: 824,
    bgIsClose: true,
    autoClose: false,
  }
);
const close = () => {
  emits("close");
  if (props.autoClose) return;
  emits("update:value", false);
};

const bgClick = () => {
  if (!props.bgIsClose) return;
  emits("update:value", false);
  emits("bgClick");
  emits("close");
};

const getStyle = computed(() => {
  return {
    width:
      typeof props.width === "number" ? `${props.width / 14}rem` : props.width,
    "min-width":
      typeof props.minWidth === "number"
        ? `${props.minWidth / 14}rem`
        : props.minWidth,
    "min-height":
      typeof props.minHeight === "number"
        ? `${props.minHeight / 14}rem`
        : props.minHeight,
  };
});

const getHeaderStyle = computed(() => {
  const headerStyle = props.headerStyle || {};
  return {
    padding: `0 ${store.getIsPhone ? 41 / 14 : 54 / 14}rem`,
    ...headerStyle,
  };
});

const getContentStyle = computed(() => {
  const contentStyle = props.contentStyle || {};
  return {
    padding: `0 ${store.getIsPhone ? 41 / 14 : 54 / 14}rem`,
    ...contentStyle,
  };
});
</script>

<style lang="scss" scoped>
.bg-box {
  height: 100%;
  z-index: 11;
}
.dialog-box {
  background-color: rgba($color: #000000, $alpha: 0.75);
  border-radius: 60px 0px 60px 0px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: 0px calc(100% + 20px);
  background-size: 742px 272px;
  background-image: url("@/assets/images/common/dialog-bg.png");
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 60px 0px 60px 0px;
    border: 1px solid rgba($color: #cecfce, $alpha: 0.45);
    left: -10px;
    top: -10px;
    clip-path: polygon(0% 0%, 100% 0%, 100% 10px, 50px 100%, 0 100%);
    opacity: 0.75;
    z-index: 1;
    pointer-events: none;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 54px;
    height: 54px;
    background-size: 100% 100%;
    background-image: url("@/assets/images/common/dialog-bg-line.png");
    transform: translate(50%, 50%);
  }
  .header-box {
    height: 95px;
    align-items: center;
    background-image: url("@/assets/images/common/dialog-header-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    border-radius: 60px 0 0 0;
    .title-name {
      font-weight: 400;
      font-size: 40px;
      color: #ff773d;
      line-height: 40px;
      font-style: normal;
      text-transform: none;
    }

    .icon-close {
      position: absolute;
      right: 22px;
      cursor: pointer;
      width: 50px;
      height: 50px;
      z-index: 1;
      background-image: url("@/assets/images/common/icon-close.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      &:active {
        background-image: url("@/assets/images/common/icon-close-active.png");
      }
    }
  }
  .title-line {
    height: 6px;
    width: calc(100% - 20px - 20px);
    margin-left: 20px;
    margin-bottom: 43px;
    object-fit: contain;
  }
}

@media (max-width: 900px) {
  .dialog-box {
    .header-box {
      .title-name {
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 36px;
        color: #ff773d;
      }
    }
  }
}
</style>
