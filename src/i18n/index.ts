import { createI18n } from "vue-i18n";

import Messages from "./i18nText";
import i18nJsonText from "./i18nJsonText.json";
import lodash from "lodash";

export const messages = lodash.merge({}, i18nJsonText, Messages);

const i18n = createI18n({
  locale: "zh-cn",
  fallbackLocale: "en-us",
  legacy: false,
  messages: messages,
});

export const loadTranslation = (lang: string, key: string) => {
  return messages[lang]?.[key] || key; // 如果找不到 key，则返回 key 本身
};

export default i18n;
