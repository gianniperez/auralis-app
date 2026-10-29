export interface NavItem {
  id: string;
  label: {
    es: string;
    en: string;
  };
  href: string;
  iconName: "home" | "about" | "artworks" | "services" | "faqs";
}

export const navItems: NavItem[] = [
  {
    id: "hero",
    label: { es: "Inicio", en: "Home" },
    href: "#hero",
    iconName: "home",
  },
  {
    id: "about",
    label: { es: "Sobre Auralis", en: "About" },
    href: "#about",
    iconName: "about",
  },
  {
    id: "artworks",
    label: { es: "Ilustraciones", en: "Artworks" },
    href: "#artworks",
    iconName: "artworks",
  },
  {
    id: "services",
    label: { es: "Servicios", en: "Services" },
    href: "#services",
    iconName: "services",
  },
  {
    id: "faqs",
    label: { es: "Preguntas", en: "FAQs" },
    href: "#faqs",
    iconName: "faqs",
  },
];
