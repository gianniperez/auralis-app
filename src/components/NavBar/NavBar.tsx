"use client";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/utils/isMobile";
import NavBarMobile from "../NavBarMobile/NavBarMobile";
import NavBarDesktop from "../NavBarDesktop/NavBarDesktop";
import { useTranslations } from "next-intl";
import { getNavLinks } from "@/data/navLinks";

/**
 * The global navigation bar component. Responsible for managing layout state
 * based on scroll position and rendering the appropriate desktop or mobile variant.
 */
export default function NavBar() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const tNavBar = useTranslations("Navbar");
  const tHome = useTranslations("Home");
  const navLinks = getNavLinks(tNavBar);
  const brand = "Auralis";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Avoid hydration mismatch by waiting for client to mount
  if (!mounted) {
    return null;
  }

  return isMobile ? (
    <NavBarMobile
      brand={brand}
      navLinks={navLinks}
      isVisible={isVisible}
      isScrolled={isScrolled}
    />
  ) : (
    <NavBarDesktop
      brand={brand}
      navLinks={navLinks}
      cta={tHome("contactCta")}
      isVisible={isVisible}
      isScrolled={isScrolled}
    />
  );
}
