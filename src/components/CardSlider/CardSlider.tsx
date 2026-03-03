import { ReactNode, useState, useEffect } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { useIsMobile } from "@/utils/isMobile";
import CardSliderMobile from "../CardSliderMobile/CardSliderMobile";
import CardSliderDesktop from "../CardSliderDesktop/CardSliderDesktop";
import { ServiceType } from "@/types/ServiceType";
import "./CardSlider.scss";

/**
 * A slider container component that provides navigation controls (previous/next)
 * for wrapping and cycling through a collection of service cards.
 * @param {ReactNode} [children] - Optional fallback children to render.
 * @param {ServiceType[]} cards - The array of services to display within the slider.
 * @param {ServiceType | null} selectedCard - The currently active service card.
 * @param {() => void} onPrevious - Callback when the "previous" action is triggered.
 * @param {() => void} onNext - Callback when the "next" action is triggered.
 * @param {(card: ServiceType) => void} onSelectCard - Callback to handle the selection of a new card.
 * @param {(card: ServiceType) => ReactNode} [renderCard] - Optional render prop function for custom card rendering.
 */
type CardSliderProps = {
  children?: ReactNode;
  cards: ServiceType[];
  selectedCard: ServiceType | null;
  onPrevious: () => void;
  onNext: () => void;
  onSelectCard: (card: ServiceType) => void;
  renderCard?: (card: ServiceType) => ReactNode;
};

export default function CardSlider({
  children,
  cards,
  selectedCard,
  onPrevious,
  onNext,
  onSelectCard,
  renderCard,
}: CardSliderProps) {
  const b = useBEM("card-slider");
  const isMobile = useIsMobile();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedCard && cards) {
      const index = cards.findIndex(
        (c) => c.title.en === selectedCard.title.en,
      );
      if (index !== -1 && index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  }, [selectedCard, cards, currentIndex]);

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className={b()}>
      {isMobile ? (
        <CardSliderMobile
          cards={cards}
          currentIndex={currentIndex}
          onPrevious={onPrevious}
          onNext={onNext}
          renderCard={(card, isActive) =>
            renderCard ? (
              renderCard(card)
            ) : (
              <div style={{ opacity: isActive ? 1 : 0.5 }}>{children}</div>
            )
          }
        />
      ) : (
        <CardSliderDesktop
          cards={cards}
          selectedCard={selectedCard}
          onSelectCard={onSelectCard}
        >
          {children}
        </CardSliderDesktop>
      )}
    </div>
  );
}
