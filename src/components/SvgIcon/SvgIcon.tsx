import { useBEM } from "@/utils/component/useBEM";
import { className } from "@/utils/component/className";
import { icons, IconType } from "@/types/IconType";
import "./SvgIcon.scss";

/**
 * A dynamic SVG icon component that renders icons from a predefined library.
 * Supports custom sizing, coloring, and click interactions with BEM styling.
 * @param {IconType} icon - The key name of the icon to be rendered.
 * @param {string} [classname] - Optional additional CSS classes or BEM modifiers.
 * @param {number} [size] - Width and height of the icon in pixels.
 * @param {string} [color] - Fill and stroke color of the SVG.
 * @param {() => void} [onClick] - Optional click handler; triggers 'pointer' cursor if present.
 */
type SvgIconProps = {
  icon: IconType;
  classname?: string;
  size?: number;
  color?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
};

export default function SvgIcon({
  icon,
  classname,
  size,
  color,
  onClick,
}: SvgIconProps) {
  const b = useBEM("svg-icon");
  const Icon = icons[icon];
  if (!Icon) return null;

  return (
    <Icon
      onClick={onClick}
      className={className(b(), classname)}
      width={size}
      height={size}
      fill={color}
      color={color}
    />
  );
}
