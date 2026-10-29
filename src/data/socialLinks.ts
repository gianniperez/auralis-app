export interface SocialLink {
  label: string;
  href: string;
  iconName: "artStation" | "instagram" | "behance" | "tikTok" | "x" | "fiverr";
}

export const socialLinks: SocialLink[] = [
  {
    label: "ArtStation",
    href: "https://www.artstation.com/auralisart",
    iconName: "artStation",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/auralisart_",
    iconName: "instagram",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/auralis",
    iconName: "behance",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@auralisart",
    iconName: "tikTok",
  },
];
