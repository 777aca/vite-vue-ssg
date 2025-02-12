<template>
  <div class="appbar" :class="getClassNames">
    <!--没什么含义，主要用来获取appBarBlack模式的高度-->
    <div class="appBarBlackHeight"></div>
    <div class="header-item flex-column-center justify-start">
      <div
        v-if="!isPhone"
        class="logo-container"
        :class="store.getLangName === 'JA' ? 'JA-logo-container' : ''"
      >
        <div
          v-if="showLogo"
          :class="store.getLangName === 'JA' ? 'JA-logo-box' : 'logo-box'"
        ></div>
        <div
          v-if="!showLogo"
          :class="
            store.getLangName === 'JA' ? 'JA-logo-box-black' : 'logo-box-black'
          "
        ></div>
      </div>
      <!-- 占位 -->
      <div v-else :class="'noLogo'"></div>
      <div class="menu-box flex-center" @click="showMenu" v-if="isPhone">
        <img src="@/assets/images/common/icon-menu.png" />
      </div>

      <div
        class="tab-box flex-column-center"
        v-if="!isPhone"
        :class="'tab-box-' + store.getLang"
      >
        <div v-if="showTab" class="flex-column-center">
          <div
            class="tab-item"
            :class="{
              [`active-item-${store.getLang}`]: selectPath === item.path,
              'font-family-medium':
                store.getLang == 'ja-jp' || store.getLang == 'zh-tw',
              'font-family-regular':
                store.getLang != 'ja-jp' && store.getLang != 'zh-tw',
              [`off-set-${store.getLang}`]: !showLogo,
            }"
            v-for="(item, index) in tabList || HOME_APP_BAR_LIST"
            :key="index"
            @click="tabClick(item)"
          >
            {{ $in(lang, item.name) }}
          </div>
        </div>
      </div>

      <div class="reservation-box flex-column-center">
        <div
          class="language-box"
          :class="!store.getIsPhone ? 'language-box-line' : ''"
          v-if="ENV_MODE != 'productioncn'"
        >
          <div class="header-box flex-center">
            <div
              class="language"
              :class="store.getIsPhone ? 'language-padding' : ''"
            >
              {{ store.getLangName == "JA" ? "JP" : store.getLangName }}
            </div>
            <img
              class="icon-arrow-down"
              v-if="type == 'defalut' || !store.getIsPhone"
              src="@/assets/images/common/icon-arrow-down.png"
            />
            <img
              class="icon-arrow-down"
              v-else
              src="@/assets/images/common/icon-arrow-down-black.png"
            />
          </div>
          <div class="hant-content-box" :style="getHandContentStyle">
            <div
              class="hant-content-item flex-center"
              :class="{ 'active-item': store.getLang === item.value }"
              v-for="item in LANGUAGELIST"
              :key="item.name"
              @click="langChange(item.value)"
            >
              {{ item.name == "JA" ? "JP" : item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <PhoneMenuDrawer
      v-if="store.getIsPhone"
      ref="phoneMenuDrawerRef"
      :select-path="selectPath"
      @item-click="tabClick"
      :tab-list="tabList || HOME_APP_BAR_LIST"
    ></PhoneMenuDrawer>
  </div>
</template>
<script setup lang="ts">
import { HomeAppBarOptions, Lang } from "@/types";
import { ref, withDefaults, watch, computed } from "vue";
import PhoneMenuDrawer from "@/components/PhoneMenuDrawer/index.vue";
import { useDefaultStore } from "@/stores";
import { LANGUAGELIST, HOME_APP_BAR_LIST } from "@/common/staticJson";
import { routerPush } from "@/utils";
import { ENV_MODE } from "@/common/config/index";

const phoneMenuDrawerRef = ref<InstanceType<typeof PhoneMenuDrawer>>();
const store = useDefaultStore();
const props = withDefaults(
  defineProps<{
    type?: "defalut" | "black";
    lang?: Lang;
    value: string;
    showLogo?: boolean;
    routerLink?: boolean;
    showTab?: boolean;
    isReservationView?: boolean;
    isReservationLink?: boolean;
    tabList?: HomeAppBarOptions[];
  }>(),
  {
    type: "defalut",
    showLogo: true,
    routerLink: false,
    showTab: true,
    isReservationView: false,
    isReservationLink: false,
    lang: "en-us",
  }
);

const emits = defineEmits(["tabChange", "update:value"]);
const selectPath = ref<string>("/");

const showMenu = () => {
  phoneMenuDrawerRef.value.show();
};

const langChange = (lang: Lang) => {
  console.log("langChange::", lang);
  store.setLang(lang, true);
};

const tabClick = (data: HomeAppBarOptions) => {
  emits("update:value", data.path);
  if (props.routerLink) {
    store.setHomeScrollToView(data.path);
    routerPush("/");
  }
  emits("tabChange", data);
};

watch(
  () => props.value,
  (val) => {
    selectPath.value = val;
  }
);

const getHandContentStyle = computed(() => {
  return {
    transform: `translateX(${store.getIsPhone ? "-20%" : "-12%"} ) translateY(${props.type == "defalut" ? 0 : 25 / 14}rem)`,
  };
});

const getClassNames = computed(() => {
  return `${props.type} appbar-${store.getLang}`;
});

const isPhone = computed(() => {
  return store.getIsPhone;
});
</script>
<style lang="scss" scoped>
@media (min-width: 901px) {
  .appbar {
    position: fixed;
    width: 100%;
    z-index: 7;
    width: 100%;
    height: 88px;

    .logo-container {
      padding-right: 88px;
      display: flex;
      justify-content: flex-start;
      margin-left: 39px;
    }

    .logo-box {
      width: 237px;
      height: 77px;
      background-image: url("@/assets/images/common/logo.png");
      background-size: 100%;
      background-repeat: no-repeat;
      z-index: 2;
    }

    .logo-box-black {
      width: 237px;
      height: 77px;
      background-image: url("@/assets/images/common/logo.png");
      background-size: 100%;
      z-index: 2;
      background-repeat: no-repeat;
    }

    .noLogo {
      width: 334px;
      height: 159px;
    }

    .header-item {
      height: 100%;

      .tab-box {
        z-index: 2;

        .tab-item {
          margin-right: 86px;
          font-weight: 750;
          font-size: 28px;
          color: #c8c8c8;
          letter-spacing: -5%;
          cursor: pointer;

          &.active-item-zh-cn {
            color: #ff773d;
            font-family: S1-Font-CN-Medium;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .reservation-box {
        position: absolute;
        right: 77px;

        .reservationViewlink {
          margin-top: -10px !important;
          margin-right: 30px;
          position: relative;

          &::before {
            content: "";
            width: 1px;
            width: 1px;
            height: 26px;
            display: inline-block;
            background: #d9d9d9;
            align-self: center;
            margin: 0 29px;
            position: absolute;
            right: -30px;
            top: 19px;
            opacity: 0.7;
          }
        }

        .language-box {
          display: flex;
          height: 88px;
          align-items: center;
          position: relative;

          &:hover {
            .hant-content-box {
              // height: 202px;
              min-height: 190px;
              padding: 30px 0;
              transition: all 0.3s;
            }
          }

          .hant-content-box {
            position: absolute;
            width: 151px;
            top: 100%;
            height: 0;
            overflow: hidden;
            transition: all 0.3s;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(16px);
            border-radius: 16px 0 16px 0;

            .hant-content-item {
              height: 63px;
              cursor: pointer;
              font-size: 24px;
              color: #c8c8c8;
              font-family: "S1-Font-EN-Regular";

              &:hover {
                color: #ff773d;
                transition: all 0.3s;
              }
            }

            .active-item {
              color: #ff773d;
            }
          }

          .header-box {
            cursor: pointer;

            .language {
              height: 29px;
              font-style: normal;
              font-weight: 400;
              font-size: 24px;
              line-height: 29px;
              color: #ffffff;
              font-family: "S1-Font-EN-Regular";
            }

            .icon-arrow-down {
              width: 13px;
              height: 12px;
              margin-left: 22px;
              -webkit-user-drag: none;
            }
          }
        }
      }
    }
  }

  .black,
  .appBarBlackHeight {
    height: 88px !important;
    background-color: black;
  }

  .appBarBlackHeight {
    opacity: 0;
    position: absolute;
    z-index: -100;
    top: -100px;
  }
}

@media (max-width: 900px) {
  .appbar {
    position: fixed;
    width: 100%;
    z-index: 7;
    height: 107px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    .header-item {
      flex: 1;
      box-sizing: border-box;

      .menu-box {
        width: 50px;
        height: 44px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .reservation-box {
        flex: 1;
        margin: 17px 0;
        display: flex;
        justify-content: flex-end;

        .language-box {
          display: flex;
          height: 42px;
          align-items: center;
          position: relative;

          &.language-box-line::before {
            content: "";
            width: 1px;
            width: 1px;
            height: 26px;
            display: inline-block;
            background: #d9d9d9;
            align-self: center;
            margin: 0 29px 0 0;
          }

          &:hover {
            .hant-content-box {
              // height: 397px;
              min-height: 300px;
              transition: all 0.3s;
            }
          }

          .hant-content-box {
            position: absolute;
            top: 100%;
            height: 0;
            overflow: hidden;
            transition: all 0.3s;
            background: rgba(0, 0, 0, 0.85);
            border-radius: 30px 0;
            backdrop-filter: blur(8px);
            width: 179px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            right: -40px;
            top: 58px;

            .hant-content-item {
              cursor: pointer;
              color: #c8c8c8;
              height: 82px;
              font-family: "S1-Font-EN-Regular";
              font-size: 28px;
              font-weight: 400;
              line-height: 33.6px;
              text-align: left;
            }

            .active-item {
              color: #ff773d;
            }
          }

          .header-box {
            cursor: pointer;
            display: flex;
            align-items: center;

            .language {
              font-style: normal;
              font-weight: 400;
              font-size: 36px;
              line-height: 36px;
              color: #ffffff;
              font-family: "S1-Font-EN-Regular";
              margin-left: 49px;
            }

            .icon-arrow-down {
              width: 16px;
              height: 16px;
              margin-left: 6px;
              -webkit-user-drag: none;
            }
          }
        }
      }
    }
  }

  .black {
    height: 107px;

    .language-box {
      &::before {
        content: "";
        background: #000 !important;
      }

      .language {
        font-family: S1-Font-EN-Regular;
        color: #000 !important;
      }

      .active-item {
        color: #ff773d !important;
      }
    }
  }

  .logo-box {
    position: absolute;
    width: 368px;
    height: 207px;
    top: 61px;
    left: -39px;
    background-image: url("@/assets/images/common/logo.png");
    background-size: 100%;
    background-repeat: no-repeat;
    z-index: 0;
    pointer-events: none;
  }
}
</style>
