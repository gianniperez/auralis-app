"use client";
import { useBEM } from "@/utils/component/useBEM";
import Typography from "../Typography/Typography";
import SvgIcon from "../SvgIcon/SvgIcon";
import Image from "@/components/Image/Image";
import { className } from "@/utils/component/className";
import "./Heading.scss";

/**
 * Renders a standard header for page sections, supporting icons, images, and alignments.
 * @param {string} heading - The primary title for the section.
 * @param {string} [copy] - Supporting descriptive text.
 * @param {boolean} [icon] - If true, displays a decorative icon alongside the heading.
 * @param {string} [imgSrc] - Source URL for an optional image to accompany the heading.
 * @param {string} [imgAlt] - Alt text for the accompanying image.
 * @param {"center" | "left"} [align] - Text alignment.
 * @param {boolean} [contentToTheRight] - Reverses layout order, placing the image/icon to the right.
 * @param {string} [classname] - Optional additional CSS classes.
 */
type HeadingProps = {
  heading: string;
  copy?: string;
  icon?: boolean;
  imgSrc?: string;
  imgAlt?: string;
  align?: "center" | "left";
  contentToTheRight?: boolean;
  classname?: string;
};

export default function Heading({
  heading,
  copy,
  icon,
  align,
  imgSrc,
  imgAlt,
  contentToTheRight,
  classname,
}: HeadingProps) {
  const b = useBEM("heading");

  return (
    <div
      className={className(
        b(null, align ?? "center"),
        imgSrc && b(null, "with-img"),
        contentToTheRight && b(null, "right"),
        classname,
      )}
    >
      {imgSrc && <Image classname={b("img")} src={imgSrc} alt={imgAlt ?? ""} />}
      <div className={b("content")}>
        {icon && <SvgIcon icon="gradLis" size={32} />}
        <Typography tag="h1" text={heading} />
        {copy && <Typography tag="p" text={copy} />}
      </div>
    </div>
  );
}
