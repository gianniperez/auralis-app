"use client";
import Heading from "@/components/Heading/Heading";
import { useTranslations } from "next-intl";
import FeatureItem from "@/components/FeatureItem/FeatureItem";
import { IconType } from "@/types/IconType";
import { useBEM } from "@/utils/component/useBEM";
import { useIsMobile } from "@/utils/isMobile";
import "./page.scss";

export default function AboutPage() {
  const b = useBEM("about-page");

  const tAbout = useTranslations("About");
  const pillars = tAbout.raw("firstSection.pillars");

  const isMobile = useIsMobile();

  return (
    <main className={b()}>
      <Heading
        classname={b("first-section")}
        heading={tAbout("firstSection.heading")}
        copy={tAbout("firstSection.copy")}
        icon={isMobile}
      />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className={b("pillars")}>
        {pillars.map((pillar: any, index: number) => (
          <FeatureItem
            key={index}
            icon={`pillar${index + 1}` as IconType}
            heading={pillar.heading}
            subheading={pillar.subheading}
            copy={pillar.copy}
          />
        ))}
      </div>
      <Heading
        classname={b("second-section")}
        heading={tAbout("secondSection.heading")}
        copy={tAbout.raw("secondSection.copy")}
        icon={isMobile}
        imgSrc="/images/the-soul.png"
        imgAlt="The Soul of Auralis"
        contentToTheRight={true}
      />
      <Heading
        classname={b("third-section")}
        heading={tAbout("thirdSection.heading")}
        copy={tAbout.raw("thirdSection.copy")}
        icon={isMobile}
        imgSrc="/images/the-artist.png"
        imgAlt="The Artist"
      />
    </main>
  );
}
