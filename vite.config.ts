import { defineConfig } from "vite";
import postCssPxToRem from "postcss-pxtorem";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import Pages from "vite-plugin-pages";
import { unheadVueComposablesImports } from "@unhead/vue";
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from "vite-plugin-compression";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
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
    }),
    viteCompression({
      verbose: true, // 控制台显示压缩日志
      threshold: 10240, // 仅压缩 >10KB 的文件
      algorithm: "gzip", // 压缩算法（可选 brotliCompress）
      ext: ".gz", // 压缩文件后缀
      deleteOriginFile: false // 保留原始文件（生产环境建议关闭）
    })
  ],
  ssr: {
    // noExternal 配置项用于排除某些库，使其不被打包进最终的 bundle 中
    noExternal: ["thinkingdata-browser", "eventemitter3"]
  },
  optimizeDeps: {
    // optimizeDeps 配置项用于预构建依赖项，以确保它们在开发过程中被正确加载
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
  build: { assetsInlineLimit: 1024 * 10 }
});
