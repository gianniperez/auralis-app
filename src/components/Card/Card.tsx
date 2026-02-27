import { useBEM } from "@/utils/component/useBEM";
import { IllustrationType } from "@/types/IllustrationType";
import Image from "@/components/Image/Image";
import Typography from "../Typography/Typography";
import { useLocale } from "@/utils/useLocale";
import "./Card.scss";

/**
 * This component renders a content card for an illustration.
 * @param {IllustrationType} card - The illustration data object containing localized content and image URL.
 */
type CardProps = {
  card: IllustrationType;
};

export default function Card({ card }: CardProps) {
  const b = useBEM("card");
  const locale = useLocale();

  return (
    <div className={b()}>
      <Image classname={b("img")} src={card.imageUrl} alt={card.title.en} />
      <div className={b("text")}>
        <Typography
          tag="h3"
          text={locale == "en" ? card.title.en : card.title.es}
        />
        <Typography
          text={locale == "en" ? card.description.en : card.description.es}
        />
      </div>
    </div>
  );
}
