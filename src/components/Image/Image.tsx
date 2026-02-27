import { useBEM } from "@/utils/component/useBEM";
import { className } from "@/utils/component/className";
import "./Image.scss";

/**
 * A standard image component that provides consistent styling and border-radius control.
 * It uses BEM modifiers to apply predefined border-radius variants and handles
 * default dimensions to prevent layout shifts.
 * @param {string} [src] - The source URL of the image.
 * @param {string} [alt] - Descriptive text for accessibility and SEO.
 * @param {number} [width] - The intrinsic width of the image in pixels.
 * @param {number} [height] - The intrinsic height of the image in pixels.
 * @param {string} [classname] - Optional additional CSS classes or modifiers.
 * @param {"sm" | "md" | "lg"} [borderRadius] - The border-radius variant (BEM modifier).
 */
type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  classname?: string;
  borderRadius?: "sm" | "md" | "lg";
};

export default function Image({
  src,
  alt,
  width,
  height,
  classname,
  borderRadius,
}: ImageProps) {
  const b = useBEM("image");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className(b(null, [borderRadius ?? ""]), classname)}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}
