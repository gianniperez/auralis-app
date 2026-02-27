import { useBEM } from "@/utils/component/useBEM";
import { IconType } from "@/types/IconType";
import SvgIcon from "../SvgIcon/SvgIcon";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Link from "next/link";
import "./Panel.scss";

/**
 * This component renders a versatile information block or "pillar" for the Auralis interface.
 *
 * @param {IconType} [icon] - The main mystical icon displayed at the top.
 * @param {string} [description] - The core message or value proposition text.
 * @param {string} [cta] - The label for the primary action button.
 * @param {string} [ctaHref] - An optional href to the button.
 * @param {IconType} [ctaIcon] - An optional icon to accompany the button text.
 * @param {boolean} [centerAlign] - When true, applies a centered axis to all elements,
 * ideal for mobile and highlight sections.
 */
type PanelProps = {
  icon: IconType;
  description: string;
  cta: string;
  ctaHref?: string;
  ctaIcon?: IconType;
  centerAlign?: boolean;
};

export default function Panel({
  icon,
  description,
  cta,
  ctaHref,
  ctaIcon,
  centerAlign,
}: PanelProps) {
  const b = useBEM("panel");

  return (
    <div className={b(null, centerAlign ? "center" : "")}>
      <SvgIcon classname={b("icon")} icon={icon} color="white" />
      <Typography text={description} />
      <Link href={ctaHref || "/"}>
        <Button icon={ctaIcon}>{cta}</Button>
      </Link>
    </div>
  );
}
