import { useBEM } from "@/utils/component/useBEM";
import { LinkType } from "@/types/LinkType";
import Link from "next/link";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./SocialLinks.scss";

/**
 * Renders a list of external social media links styled as icons or text.
 * @param {LinkType[]} socialLinks - Array of social link data containing labels and URLs.
 * @param {"primary" | "secondary" | "terciary"} [type] - Determines the color scheme and appearance footprint.
 */
type SocialLinksProps = {
  socialLinks: LinkType[];
  type?: "primary" | "secondary" | "terciary";
};

export default function SocialLinks({ socialLinks, type }: SocialLinksProps) {
  const b = useBEM("social-links");

  return (
    <div className={b(null, type ?? "primary")}>
      {socialLinks.map((socialLink) => (
        <Link
          key={socialLink.label}
          className={b("link", type ?? "primary")}
          href={socialLink.href}
          target="_blank"
        >
          {socialLink.icon && (
            <SvgIcon
              classname={b("icon", type ?? "primary")}
              icon={socialLink.icon}
              size={24}
            />
          )}
          <span className={b("label", type ?? "primary")}>
            {socialLink.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
