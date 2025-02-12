import { defineConfig } from "vite";
import postCssPxToRem from "postcss-pxtorem";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import Pages from "vite-plugin-pages";
import { unheadVueComposablesImports } from "@unhead/vue";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  envDir: "env",
  resolve: {
    extensions: [".ts", ".vue"],
    alias: {
      "@": "/src"
    }
  },
  plugins: [
    vue(),
    UnoCSS(),
    Pages({
      dirs: resolve(__dirname, "src/pages"),
      extensions: ["vue"]
    }),
    AutoImport({
      imports: [unheadVueComposablesImports]
    })
  ],
  ssr: {
    noExternal: ["thinkingdata-browser", "eventemitter3"]
  },
  optimizeDeps: {
    include: ["eventemitter3", "window"] // 确保 eventemitter3 被预构建
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 14,
          propList: ["*", "!border"], // 除 border 外所有px 转 rem // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: [".norem"], // 过滤掉norem-开头的class，不进行rem转换，这个内容可以不写
          unitPrecision: 5, // 转换后的精度，即小数点位数
          replace: true, // 是否直接更换属性值而不添加备份属性
          mediaQuery: false, // 是否在媒体查询中也转换px为rem
          minPixelValue: 2 // px小于2的不会被转换
        })
      ]
    }
  },
  build: {}
});
