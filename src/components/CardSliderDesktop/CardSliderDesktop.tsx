import { ReactNode, useEffect, useRef } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { ServiceType } from "@/types/ServiceType";
import { useLocale } from "next-intl";
import Image from "../Image/Image";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./CardSliderDesktop.scss";

/**
 * Desktop-optimized version of the CardSlider. Arranges service cards in a grid or flex layout
 * suitable for larger screens.
 * @param {ReactNode} [children] - Detailed view or expanded content for the selected card.
 * @param {ServiceType[]} cards - Array of service data objects to display.
 * @param {ServiceType | null} selectedCard - The currently active/highlighted service card.
 * @param {(card: ServiceType) => void} onSelectCard - Callback triggered when a card is selected.
 */
type CardSliderDesktopProps = {
  children?: ReactNode;
  cards: ServiceType[];
  selectedCard: ServiceType | null;
  onSelectCard: (card: ServiceType) => void;
};

export default function CardSliderDesktop({
  children,
  cards,
  selectedCard,
  onSelectCard,
}: CardSliderDesktopProps) {
  const b = useBEM("card-slider-desktop");

  const locale = useLocale();

  return (
    <div className={b()}>
      <div className={b("cards")}>
        {cards.map((card) => {
          const isActive = selectedCard?._id === card._id;
          return (
            <div
              className={b("card", isActive ? "active" : undefined)}
              key={card._id}
              onClick={() => onSelectCard(card)}
            >
              <Image
                classname={b("img")}
                width={180}
                height={180}
                borderRadius="lg"
                src={card.imageUrl}
                alt={card.title.en}
              />
              {locale == "en" ? card.title.en : card.title.es}
              {isActive && (
                <SvgIcon classname={b("arrow-icon")} icon="arrow" size={18} />
              )}
            </div>
          );
        })}
      </div>
      {children && <div className={b("content")}>{children}</div>}
    </div>
  );
}
