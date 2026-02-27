import { useBEM } from "@/utils/component/useBEM";
import { Link, usePathname } from "@/i18n/routing";
import SvgIcon from "../SvgIcon/SvgIcon";
import { LinkType } from "@/types/LinkType";
import Button from "../Button/Button";
import Image from "@/components/Image/Image";
import { className } from "@/utils/component/className";
import "./NavBarDesktop.scss";

/**
 * The desktop variant of the main navigation bar. Features inline links, brand logo,
 * and a prominent call-to-action button.
 * @param {string} brand - The brand name or logo text.
 * @param {LinkType[]} navLinks - Array describing the navigation routes.
 * @param {string} cta - Text for the prominent call-to-action button.
 * @param {boolean} isVisible - Whether the navbar is currently visible on screen.
 * @param {boolean} isScrolled - Whether the user has scrolled down from the top.
 */
type NavBarDesktopProps = {
  brand: string;
  navLinks: LinkType[];
  cta: string;
  isVisible: boolean;
  isScrolled: boolean;
};

export default function NavBarDesktop({
  brand,
  navLinks,
  cta,
  isVisible,
  isScrolled,
}: NavBarDesktopProps) {
  const b = useBEM("nav-bar-desktop");
  const pathname = usePathname();

  return (
    <nav className={b()}>
      <Image classname={b("bg")} src="/images/sparkles-md.png" alt="sparkles" />
      <div
        className={className(
          b("wrapper", isVisible ? "" : "hidden"),
          b("wrapper", isScrolled ? "scrolled" : ""),
        )}
      >
        <div className={b("container")}>
          <Link href="/" className={b("logo")}>
            <SvgIcon icon="isologo" size={50} />
            <span className={b("brand-name")}>{brand}</span>
          </Link>
          <div className={b("nav-links")}>
            {navLinks.slice(0, -1).map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={b("nav-link", isActive ? "active" : undefined)}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <SvgIcon classname={b("icon-lis")} icon="activeBar" />
                  )}
                </Link>
              );
            })}
          </div>
          <Link href={navLinks[navLinks.length - 1].href}>
            <Button classname={b("btn")} type="secondary">
              {cta}
            </Button>
          </Link>
        </div>
        <div className={b("decorative-bar")} />
      </div>
    </nav>
  );
}
