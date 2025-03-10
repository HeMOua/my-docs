import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "知识体系",
    icon: "book",
    link: "/knowledge/"
  },
  {
    text: "专题",
    icon: "pencil",
    link: "/topic/",
    children: [
      { text: "Java", icon: "fa-brands fa-java", link: "/topic/java/" },
      { text: "前端", icon: "fa-brands fa-html5", link: "/topic/front-end/" },
      { text: "Python", icon: "fa-brands fa-python", link: "/topic/python/" },
      {
        text: "人工智能",
        icon: "fa-solid fa-hexagon-nodes",
        link: "/topic/ai/"
      }
    ]
  },
  {
    text: "小工具",
    icon: "wrench",
    link: "/tools/"
  },
  {
    text: "网站相关",
    icon: "circle-info",
    children: [
      { text: "关于作者", icon: "user", link: "/about/author/" },
      { text: "更新历史", icon: "history", link: "/timeline/" }
    ]
  }
]);
