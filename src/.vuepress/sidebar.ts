import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/knowledge/": [
    {
      text: "Java",
      icon: "fa-brands fa-java",
      prefix: "Java/",
      link: "/knowledge/Java/",
      children: "structure",
      collapsible: true,
    },
  ],
  "/about/": [
    {
      text: "关于作者",
      icon: "user",
      prefix: "author/",
      children: "structure",
    },
    {
      text: "关于网站",
      icon: "globe",
      prefix: "website/",
      children: "structure",
    },
  ]
});
