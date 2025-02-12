<template>
  <Teleport to="body">
    <div class="app-mask" ref="maskRef" :style="getStyle" v-if="isShow" @click.stop="bgClick">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {watch, ref, computed, nextTick} from "vue";
import {gsap} from "gsap";

const emits = defineEmits(["bgClick"]);
const props = defineProps<{
  show: boolean;
  color?: string;
  zIndex?: number;
}>();

const isShow = ref<boolean>(false);

const maskRef = ref<HTMLDivElement>();

const getStyle = computed(() => {
  return {
    backgroundColor: props.color ?? "rgba(0,0,0,0.7)",
    "z-index": props.zIndex
  };
});

const bgClick = () => {
  emits("bgClick");
};
watch(
  () => props.show,
  (val) => {
    isShow.value = true;
    nextTick(() => {
      if (!maskRef.value) return;
      if (val) {
        maskRef.value.style.display = "block";
        gsap.to(maskRef.value, {
          opacity: 1,
          duration: 0.5
        });
      } else {
        gsap.to(maskRef.value, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            maskRef.value.style.display = "none";
            isShow.value = false;
          }
        });
      }
    });
  },
  {
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
.app-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 99;
  opacity: 0;
  display: none;
  vertical-align: middle;
  background-color: rgba($color: #000000, $alpha: 0.7) !important;
  backdrop-filter: blur(7px);
}
</style>
