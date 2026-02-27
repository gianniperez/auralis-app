import { LinkType } from "@/types/LinkType";

export const getNavLinks = (t: (key: string) => string): LinkType[] => [
  { label: t("home"), href: "/", icon: "home" },
  { label: t("artworks"), href: "/artworks", icon: "artworks" },
  { label: t("services"), href: "/services", icon: "services" },
  { label: t("about"), href: "/about", icon: "about" },
  { label: t("faqs"), href: "/faqs", icon: "faqs" },
  { label: t("contact"), href: "/contact", icon: "contact" },
];
