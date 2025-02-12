<template>
  <div class="main-view" :class="'main-view-' + store.getLang">
    <div>
      {{ $in(lang, "home.main") }}
    </div>
    <img ref="dropdownImgRef" class="dropdown-img" v-if="!store.getIsPhone" src="@/assets/images/home/mainView/icon-dropdown.png" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useDefaultStore } from "@/stores";
import { gsap } from "gsap";
import { LANGUAGELIST } from "@/common/staticJson";
import { Lang } from "@/types";

const props = withDefaults(
  defineProps<{
    lang?: Lang;
  }>(),
  {
    lang: "en-us"
  }
);

const dropdownImgRef = ref<HTMLImageElement>();
const store = useDefaultStore();
const langChangeType = ref(4);
// 设置动画
const startAnimation = () => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(dropdownImgRef.value, {
    duration: 1,
    opacity: 0.4,
    ease: "power1.inOut",
    y: 5
  }).to(dropdownImgRef.value, {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power1.inOut"
  });
};

onMounted(async () => {
  if (!store.getIsPhone && dropdownImgRef.value) {
    startAnimation();
  }

  const langItem = LANGUAGELIST.find((item) => item.name === store.getLangName);
  if (langItem) {
    langChangeType.value = langItem.type;
    // getSocialMediaLink();
  }
  // const result = await milestone();
  // if (result) allTotal.value = result.total;
});
</script>
<style lang="scss" scoped>
@media (min-width: 901px) {
  .main-view {
    width: 100%;
    position: relative;
    height: var(--app-view-height);
    .dropdown-img {
      position: absolute;
      bottom: 26px;
      width: 64px;
      height: 33px;
      left: 50%;
      transform: translateX(-50%);
    }
    img {
      user-select: none;
      -webkit-user-drag: none;
    }
  }
}

@media (max-width: 900px) {
  .main-view {
    width: 100vw;
    position: relative;
    overflow: hidden;
    height: var(--app-view-height);
    background-color: #000000 !important;

    .dropdown-img {
      position: absolute;
      bottom: 26px;
      width: 64px;
      height: 33px;
      left: 50%;
      transform: translateX(-50%);
    }

    img {
      user-select: none;
      -webkit-user-drag: none;
    }
  }
}
</style>
