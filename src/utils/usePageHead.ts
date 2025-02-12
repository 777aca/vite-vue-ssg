import { loadTranslation } from "@/i18n";

export function usePageHead(lang: string, title?: string) {
  const $in = loadTranslation;
  useHead({
    title: title ? $in(lang, title) : $in(lang, "app.title"),
    meta: [
      {
        name: "description",
        content: $in(lang, "app.description")
      },
      {
        name: "keywords",
        content: $in(lang, "app.keywords")
      },
      {
        property: "og:title",
        content: title ? $in(lang, title) : $in(lang, "app.title")
      },
      {
        property: "og:description",
        content: $in(lang, "app.description")
      },
      {
        name: "twitter:title",
        content: title ? $in(lang, title) : $in(lang, "app.title")
      },
      {
        name: "twitter:description",
        content: $in(lang, "app.description")
      }
    ]
  });
}
