import { MouseEventHandler, ReactNode } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { className } from "@/utils/component/className";
import { IconType } from "@/types/IconType";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./Button.scss";

/**
 * A versatile button component that supports icons, text labels, and multiple visual variants.
 * It integrates with SvgIcon and uses BEM modifiers to manage primary and secondary styles.
 * @param {ReactNode} [children] - The label or elements to be rendered inside the button.
 * @param {string} [classname] - Optional additional CSS classes.
 * @param {IconType} [icon] - The key name of the icon to display before the text.
 * @param {number} [iconSize=16] - The size of the icon in pixels.
 * @param {"primary" | "secondary"} [type="primary"] - The visual style variant (BEM modifier).
 * @param {boolean} [disabled] - Disables interaction and applies disabled styling.
 * @param {boolean} [submit] - Sets the HTML button type to "submit" for form usage.
 * @param {MouseEventHandler<HTMLButtonElement>} [onClick] - Function called on click events.
 */
type ButtonProps = {
  children?: ReactNode;
  classname?: string;
  icon?: IconType;
  iconSize?: number;
  type?: "primary" | "secondary";
  disabled?: boolean;
  submit?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  classname,
  icon,
  iconSize,
  type,
  disabled,
  submit,
  onClick,
}: ButtonProps) {
  const b = useBEM("button");

  return (
    <button
      className={className(b(null, type ?? "primary"), classname)}
      onClick={onClick}
      disabled={disabled}
      type={submit ? "submit" : "button"}
    >
      {children}
      {icon && <SvgIcon icon={icon} size={iconSize ?? 12} color="white" />}
    </button>
  );
}
