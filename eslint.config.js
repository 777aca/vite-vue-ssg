import pluginVue from "eslint-plugin-vue";
import eslint from "@eslint/js";
// ts-eslint解析器，使 eslint 可以解析 ts 语法
import tseslint from "typescript-eslint";
// vue文件解析器
import vueParser from "vue-eslint-parser";
export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"] // vue3推荐的eslint配置
  ],
  languageOptions: {
    parser: vueParser, // 使用vue解析器，这个可以识别vue文件
    parserOptions: {
      parser: tseslint.parser, // 在vue文件上使用ts解析器
      sourceType: "module"
    }
  },
  rules: {
    "no-undef": "warn",
    "no-var": "error",
    "no-unused-vars": "error",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  }
});
