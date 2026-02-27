import { useBEM } from "@/utils/component/useBEM";
import { ServiceType } from "@/types/ServiceType";
import { useLocale } from "@/utils/useLocale";
import Image from "../Image/Image";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Link from "next/link";
import "./ServiceCard.scss";

/**
 * A card component that displays detailed information about a service,
 * including localized titles, descriptions, costs, and durations.
 * @param {ServiceType} service - The service data object.
 * @param {string} costCopy - The label for the cost section.
 * @param {string} durationCopy - The label for the duration section.
 * @param {string} ctaCopy - Text for the call-to-action button.
 * @param {string} ctaHref - URL or path for the action button's destination.
 */
type ServiceCardProps = {
  service: ServiceType;
  costCopy: string;
  durationCopy: string;
  ctaCopy: string;
  ctaHref: string;
};

export default function ServiceCard({
  service,
  costCopy,
  durationCopy,
  ctaCopy,
  ctaHref,
}: ServiceCardProps) {
  const b = useBEM("service-card");
  const locale = useLocale();

  if (!service) return null;

  return (
    <div className={b()}>
      <div className={b("img-container")}>
        <Image
          classname={b("img")}
          src={service.imageUrl}
          alt={service.title.en}
        />
      </div>
      <div className={b("info")}>
        <Typography
          tag="h1"
          text={locale == "en" ? service.title.en : service.title.es}
        />
        <Typography
          text={
            locale == "en" ? service.description.en : service.description.es
          }
        />
        <Typography tag="h3" text={costCopy} />
        <Typography text={locale == "en" ? service.cost.en : service.cost.es} />
        <Typography tag="h3" text={durationCopy} />
        <Typography
          text={locale == "en" ? service.duration.en : service.duration.es}
        />
        <Link href={ctaHref}>
          <Button classname={b("btn")}>{ctaCopy}</Button>
        </Link>
      </div>
    </div>
  );
}
