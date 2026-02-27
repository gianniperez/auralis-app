"use client";

import { ReactNode } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { motion } from "framer-motion";
import SvgIcon from "../SvgIcon/SvgIcon";
import { ServiceType } from "@/types/ServiceType";
import {
  getReorderedCards,
  getCardVariant,
  carouselVariants,
  handleSwipe,
} from "./CardSliderMobile.animations";
import "./CardSliderMobile.scss";

/**
 * Mobile-optimized slider for service cards, providing an infinite carousel experience
 * with swipe and touch gestures enabled by Framer Motion.
 * @param {ServiceType[]} cards - Array of service data objects.
 * @param {number} currentIndex - The index of the currently active card in the slider.
 * @param {() => void} onPrevious - Callback for navigating to the previous card.
 * @param {() => void} onNext - Callback for navigating to the next card.
 * @param {(card: ServiceType, isActive: boolean) => ReactNode} renderCard - Function to render each card item, providing active state context.
 */
type CardSliderMobileProps = {
  cards: ServiceType[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  renderCard: (card: ServiceType, isActive: boolean) => ReactNode;
};

export default function CardSliderMobile({
  cards,
  currentIndex,
  onPrevious,
  onNext,
  renderCard,
}: CardSliderMobileProps) {
  const b = useBEM("card-slider-mobile");

  const reorderedCards = getReorderedCards<ServiceType>(cards, currentIndex);

  return (
    <div className={b()}>
      <SvgIcon
        classname={b("previous")}
        icon="arrow"
        size={18}
        onClick={onPrevious}
      />

      <div className={b("slider-viewport")}>
        {reorderedCards.map((card, index) => {
          const isCenter = index === 0;
          const variantName = getCardVariant(index, cards.length);

          return (
            <motion.div
              key={card.title.en || card._id}
              className={b("slide-item", isCenter ? "active" : "")}
              initial={false}
              animate={variantName}
              variants={carouselVariants}
              drag={isCenter ? "x" : false}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              onDragEnd={(_, info) =>
                isCenter && handleSwipe(info, onNext, onPrevious)
              }
              style={{
                position: isCenter ? "relative" : "absolute",
                top: 0,
              }}
            >
              {renderCard(card, isCenter)}
            </motion.div>
          );
        })}
      </div>

      <SvgIcon classname={b("next")} icon="arrow" size={18} onClick={onNext} />
    </div>
  );
}
