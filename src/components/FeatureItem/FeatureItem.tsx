import { useBEM } from "@/utils/component/useBEM";
import Typography from "../Typography/Typography";
import SvgIcon from "../SvgIcon/SvgIcon";
import { IconType } from "@/types/IconType";
import { className } from "@/utils/component/className";
import "./FeatureItem.scss";

/**
 * A versatile content block used to showcase specific features or services,
 * featuring an icon, hierarchical headings, and body text.
 * @param {IconType} [icon] - The icon element to be displayed as a visual anchor.
 * @param {string} [title] - The primary heading for the feature.
 * @param {string} [subtitle] - A secondary heading providing additional context.
 * @param {string} [description] - The main descriptive text or body content.
 */
type FeatureItemProps = {
  icon: IconType;
  heading: string;
  subheading: string;
  copy: string;
  classname?: string;
};

export default function FeatureItem({
  icon,
  heading,
  subheading,
  copy,
  classname,
}: FeatureItemProps) {
  const b = useBEM("feature-item");

  return (
    <div className={className(b(), classname)}>
      <SvgIcon classname={b("icon")} icon={icon} size={140} />
      <Typography tag="h1" text={heading} />
      <Typography tag="h2" text={subheading} />
      <Typography tag="p" text={copy} />
    </div>
  );
}
