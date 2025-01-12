import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "导航",
    icon: "compass",
    link: "/nav/",
  },
  {
    text: "知识体系",
    icon: "book",
    link: "/knowledge/",
  },
  {
    text: "专题",
    icon: "pencil",
    link: "/topic/",
  },
  {
    text: "小工具",
    icon: "wrench",
    link: "/tools/",
  },
  {
    text: "网站相关",
    icon: "circle-info",
    children: [
      { text: "关于", icon: "address-card", link: "/about/" },
      { text: "更新历史", icon: "history", link: "/timeline/" },
    ]
  },
]);
