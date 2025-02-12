/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENV_MODE: string;
  readonly ENV_HTTP_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "@";

declare module "aos";

declare module "~pages";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "swiper/vue";

declare module "vue-waterfall2";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $i18n: (lang: string, key: string) => string;
  }
}

/**
 * 判断是否是微信
 */
interface Window {
  WeixinJSBridge?: {
    invoke: () => void;
  };
}
