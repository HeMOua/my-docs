import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "技数斋",
  description: "前后端 + 人工智能",

  theme

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
