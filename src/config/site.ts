export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "fishCove",
  description: "Fish care ,tips nd stories.",
  navMenuItems: [
    {
      label: "Main",
      href: "/",
    },

    {
      label: "About",
      href: "/about",
    },
    {
      label: "Articles",
      href: "/articles",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
};
