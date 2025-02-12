<template>
  <Teleport to="body">
    <div @click="close" class="drawer-box" v-show="show">
      <div :style="getStyle" ref="drawerRef">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {computed, withDefaults, ref, watch, nextTick} from "vue";
import {gsap} from "gsap";
const drawerRef = ref<HTMLDivElement>();
const emits = defineEmits(["update:value", "close"]);

const props = withDefaults(
  defineProps<{
    value: boolean;
    width?: number;
    backgroundColor?: string;
  }>(),
  {
    value: false,
    width: 40,
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }
);

const show = ref<boolean>(false);

const close = () => {
  emits("update:value", false);
  emits("close");
};

const getStyle = computed(() => {
  return {
    height: "100%",
    "background-color": props.backgroundColor,
    width: `${props.width / 14}rem`
  };
});

const startAnimation = (val: boolean) => {
  let tween: gsap.core.Tween = null;
  const width = props.width;
  if (val) {
    show.value = val;
    tween = gsap.fromTo(
      drawerRef.value,
      {
        x: -width
      },
      {
        x: 0,
        duration: 0.5
      }
    );
  } else {
    tween = gsap.to(drawerRef.value, {
      x: -width,
      duration: 0.5
    });
  }
  tween.eventCallback("onComplete", () => {
    show.value = val;
  });
};

watch(
  () => props.value,
  (val) => {
    nextTick(() => {
      startAnimation(val);
    });
  },
  {
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
.drawer-box {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
}
</style>
