"use client";
import { useBEM } from "@/utils/component/useBEM";
import SvgIcon from "../SvgIcon/SvgIcon";
import Link from "next/link";
import { useState } from "react";
import Menu from "../Menu/Menu";
import Image from "@/components/Image/Image";
import { className } from "@/utils/component/className";
import { LinkType } from "@/types/LinkType";
import "./NavBarMobile.scss";

/**
 * The mobile variant of the navigation bar, featuring a hamburger menu layout.
 * @param {string} brand - The brand name or logo text to display.
 * @param {LinkType[]} navLinks - Array describing the navigation routes.
 * @param {boolean} isVisible - Controls visibility during scroll events.
 * @param {boolean} isScrolled - Indicates if the page has been scrolled down.
 */
type NavBarMobileProps = {
  brand: string;
  navLinks: LinkType[];
  isVisible: boolean;
  isScrolled: boolean;
};

export default function NavBarMobile({
  brand,
  navLinks,
  isVisible,
  isScrolled,
}: NavBarMobileProps) {
  const b = useBEM("nav-bar-mobile");

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className={b()}>
      <Menu
        brand={brand}
        navLinks={navLinks}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      />
      <Image classname={b("bg")} src="/images/sparkles.png" alt="sparkles" />
      <div
        className={className(
          b("wrapper", isVisible ? "" : "hidden"),
          b("wrapper", isScrolled ? "scrolled" : ""),
        )}
      >
        <div className={b("action-bar")}>
          <Link href="/">
            <SvgIcon classname={b("icon")} icon="isologo" size={40} />
          </Link>
          <SvgIcon
            classname={b("icon")}
            icon="menu"
            size={25}
            onClick={() => setOpenMenu(true)}
          />
        </div>
        <div className={b("decorative-bar")} />
      </div>
    </div>
  );
}
