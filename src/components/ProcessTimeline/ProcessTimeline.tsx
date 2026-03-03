"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useBEM } from "@/utils/component/useBEM";
import { IllustrationType } from "@/types/IllustrationType";
import Heading from "@/components/Heading/Heading";
import Image from "@/components/Image/Image";
import { useLocale } from "@/utils/useLocale";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./ProcessTimeline.scss";

/**
 * A timeline that tracks and displays the sequential steps
 * of a process, featuring media and localized content.
 * @param {IllustrationType[]} [steps] - Array of steps, each containing a title, description, and image.
 */
type ProcessTimelineProps = {
  steps: IllustrationType[];
};

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const b = useBEM("process-timeline");
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerBottom = (window.innerHeight / 4) * 3;
      let newActiveIndex = 0;

      stepRefs.current.forEach((step, index) => {
        if (step) {
          const box = step.getBoundingClientRect();
          if (box.top < triggerBottom) {
            newActiveIndex = index;
          }
        }
      });

      setActiveIndex(newActiveIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={b()}>
      <SvgIcon classname={b("top-sheet-icon")} icon="sheet" size={32} />
      {steps.map((step, index) => {
        const isActive = index <= activeIndex;
        const isEven = index % 2 === 0;
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;

        const layoutClasses = [
          isEven ? "even" : "odd",
          isFirst ? "first" : undefined,
          isLast ? "last" : undefined,
        ].filter(Boolean) as string[];

        return (
          <div
            key={step._id}
            className={b("step", layoutClasses)}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
          >
            {/* Base Gray Timeline Skeleton */}
            <div className={b("timeline", layoutClasses)}>
              <div className={b("active-bar-top")} />
              <div className={b("active-bar-bottom")} />
              <div className={b("active-bar-bridge")} />
              <SvgIcon
                classname={b("star-icon", isActive ? "active" : undefined)}
                icon="star"
                size={32}
              />
            </div>

            {/* Golden Animated Timeline Overlay */}
            <div
              className={b("timeline", layoutClasses)}
              aria-hidden="true"
              style={{ pointerEvents: "none" }}
            >
              <motion.div
                className={b("active-bar-top", ["active"])}
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{
                  clipPath: isActive
                    ? "inset(0% 0% 0% 0%)"
                    : "inset(0% 0% 100% 0%)",
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className={b("active-bar-bottom", ["active"])}
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{
                  clipPath:
                    index < activeIndex
                      ? "inset(0% 0% 0% 0%)"
                      : "inset(0% 0% 100% 0%)",
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className={b("active-bar-bridge", ["active"])}
                initial={{
                  clipPath: isEven
                    ? "inset(0% 0% 0% 100%)"
                    : "inset(0% 100% 0% 0%)",
                }}
                animate={{
                  clipPath:
                    index < activeIndex
                      ? "inset(0% 0% 0% 0%)"
                      : isEven
                        ? "inset(0% 0% 0% 100%)"
                        : "inset(0% 100% 0% 0%)",
                }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
              />
            </div>
            <div className={b("content", isEven ? "to-left" : "to-right")}>
              <Image
                classname={b("img")}
                src={step.imageUrl}
                alt={locale == "en" ? step.title.en : step.title.es}
                borderRadius="md"
              />
              <Heading
                classname={b("text")}
                heading={locale == "en" ? step.title.en : step.title.es}
                copy={
                  locale == "en" ? step.description.en : step.description.es
                }
                align="left"
              />
            </div>
          </div>
        );
      })}
      <SvgIcon classname={b("bottom-sheet-icon")} icon="sheet" size={32} />
    </div>
  );
}
