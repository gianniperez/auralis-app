import { ReactNode } from "react";
import { icons } from "@/icons";

export interface HeadingProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  icon?: boolean;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
}

export default function Heading({
  title,
  subtitle,
  icon = true,
  align = "center",
  as: Tag = "h2",
  className = "",
}: HeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {/* Decorative Fleur-de-lis above section heading */}
      {icon && (
        <div className="mb-3 opacity-90 transition-transform hover:scale-110">
          <icons.gradLis className="w-8 h-8 drop-shadow-[0_0_10px_rgba(237,194,158,0.4)]" />
        </div>
      )}

      {/* Main title with fantasy display font & radiant gold shimmer */}
      {typeof title === "string" ? (
        <Tag
          className="font-display text-2xl sm:text-3xl md:text-4xl tracking-wide bg-gradient-to-r from-parchment via-gold-100 to-gold-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : (
        <Tag className="font-display text-2xl sm:text-3xl md:text-4xl tracking-wide bg-gradient-to-r from-parchment via-gold-100 to-gold-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {title}
        </Tag>
      )}

      {/* Subtitle / Copy */}
      {subtitle &&
        (typeof subtitle === "string" ? (
          <p
            className="mt-3 text-sm sm:text-base font-serif text-parchment-muted max-w-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        ) : (
          <p className="mt-3 text-sm sm:text-base font-serif text-parchment-muted max-w-xl leading-relaxed">
            {subtitle}
          </p>
        ))}
    </div>
  );
}
