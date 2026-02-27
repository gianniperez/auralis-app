import { PanInfo, Variants } from "framer-motion";

export const carouselVariants: Variants = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 10,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  right: {
    x: "85%",
    scale: 0.7,
    opacity: 0.2,
    zIndex: 5,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  left: {
    x: "-85%",
    scale: 0.7,
    opacity: 0.2,
    zIndex: 5,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  hiddenRight: {
    x: "100%",
    scale: 0.7,
    opacity: 0,
    zIndex: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  hiddenLeft: {
    x: "-100%",
    scale: 0.7,
    opacity: 0,
    zIndex: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

export const getCardVariant = (index: number, totalCards: number) => {
  if (index === 0) return "center";
  if (index === 1) return "right";
  if (index === totalCards - 1) return "left";

  if (index > 1 && index <= totalCards / 2) return "hiddenRight";
  return "hiddenLeft";
};

export const getReorderedCards = <T,>(
  cards: T[],
  currentIndex: number,
): T[] => {
  if (!cards || cards.length === 0) return [];
  const safeIndex = currentIndex % cards.length;
  return [...cards.slice(safeIndex), ...cards.slice(0, safeIndex)];
};

export const handleSwipe = (
  info: PanInfo,
  onNext: () => void,
  onPrevious: () => void,
) => {
  if (info.offset.x < -40) {
    onNext();
  } else if (info.offset.x > 40) {
    onPrevious();
  }
};
