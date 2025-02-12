import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import "virtual:uno.css";
import "aos/dist/aos.css";
import App from "./App.vue";
import "element-plus/dist/index.css";
import "./assets/style.scss";
import "./assets/font.scss";
import "./assets/language.scss";
import routes from "~pages"; // 导入 routes 配置
import { loadTranslation } from "./i18n";

const pinia = createPinia();

export const createApp = ViteSSG(
  App,
  {
    routes
  },
  ({ app }) => {
    app.use(pinia);
    // 设置全局属性 $in 方法
    app.config.globalProperties.$in = loadTranslation;
  }
);
