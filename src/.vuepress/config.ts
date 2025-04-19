import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "技数斋",
  description: "前后端 + 人工智能",

  head: [
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "贺墨于" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Java, 前端, 后端, 人工智能, 深度学习, 神经网络, yolo, 大模型, LLM"
      }
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "script",
      {},
      `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?1f34b9cd7d3a338d3e974a5ca76a99df";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`
    ]
  ],

  theme,

  markdown: {
    anchor: {
      level: [1, 2, 3, 4, 5],
    },
    headers: {
      level: [2, 3, 4, 5],
    }
  }

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
