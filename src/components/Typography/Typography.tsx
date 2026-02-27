import { ElementType } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { className } from "@/utils/component/className";

import "./Typography.scss";

/**
 * A flexible typography component that renders both plain and rich text (HTML).
 * It allows dynamic HTML tag selection and integrates with BEM for consistent styling.
 * @param {string} text - The content to be rendered (supports HTML strings).
 * @param {ElementType} [tag='p'] - The semantic HTML element to use.
 * @param {string} [classname] - Optional additional CSS classes or BEM modifiers.
 */
type TypographyProps = {
  text: string;
  tag?: ElementType;
  classname?: string;
};

export default function Typography({ text, tag, classname }: TypographyProps) {
  const b = useBEM("typography");
  const HTMLTag = tag ?? ("p" as ElementType);

  return (
    <HTMLTag
      className={className(b(), classname)}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
