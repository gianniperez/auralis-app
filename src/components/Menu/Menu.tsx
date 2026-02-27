import { useRef } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { useOnCloseEvents } from "@/utils/onCloseEvents";
import SvgIcon from "../SvgIcon/SvgIcon";
import { LinkType } from "@/types/LinkType";
import { Link, usePathname } from "@/i18n/routing";
import { className } from "@/utils/component/className";
import "./Menu.scss";

/**
 * * This component acts as a full-screen portal that slides in from the right, providing
 * an immersive navigation experience.
 * @param {string} brand - The text representing the brand identity (e.g., "Auralis").
 * @param {LinkType[]} navLinks - Data for the main site sections (Home, Artworks, etc.).
 * @param {LinkType[]} socialLinks - Data for external social media platforms.
 * @param {boolean} open - Controls the visibility and the slide-in CSS transition.
 * @param {() => void} onClose - Callback function to close the menu drawer.
 */
type MenuProps = {
  brand: string;
  navLinks: LinkType[];
  open: boolean;
  onClose: () => void;
};

export default function Menu({ brand, navLinks, open, onClose }: MenuProps) {
  const b = useBEM("menu");
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  useOnCloseEvents(open, menuRef, onClose);

  return (
    <div className={className(b(), b(null, open ? "open" : undefined))}>
      <div className={b("container")} ref={menuRef}>
        <SvgIcon
          classname={b("close-icon")}
          icon="close"
          size={16}
          onClick={onClose}
        />
        <SvgIcon classname={b("isologo")} icon="isologo" size={100} />
        <div className={b("decorative-bar")} />
        <span className={b("brand")}>{brand}</span>
        <div className={b("decorative-bar")} />
        <ul>
          {navLinks.map((navLink) => {
            const isActive =
              navLink.href === "/"
                ? pathname === "/"
                : pathname.startsWith(navLink.href);
            return (
              <li key={navLink.label}>
                <Link
                  className={b("nav-link", isActive ? "active" : undefined)}
                  href={navLink.href}
                  onMouseEnter={() => onClose}
                >
                  <span>
                    {navLink.icon && <SvgIcon icon={navLink.icon} size={20} />}
                  </span>
                  <label>{navLink.label}</label>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <div className={b("decorative-bar")} /> */}
      </div>
    </div>
  );
}
