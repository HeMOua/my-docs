import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/knowledge/": "structure",
  "/topic/": "structure",
  "/tools/": "structure",
  "/about/": [
    {
      text: "关于作者",
      icon: "user",
      link: "author/"
    },
    {
      text: "关于网站",
      icon: "globe",
      link: "website/"
    }
  ]
});
