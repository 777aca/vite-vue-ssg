// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    ["flex-row-center", { display: "flex", "justify-content": "center" }],
    ["flex-column-center", { display: "flex", "align-items": "center" }],
    [
      "flex-center",
      { display: "flex", "align-items": "center", "justify-content": "center" },
    ],
    ["flex-column", { display: "flex", "flex-direction": "column" }],
  ],
});
