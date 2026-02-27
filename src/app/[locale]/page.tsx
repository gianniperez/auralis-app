"use client";
import { useBEM } from "@/utils/component/useBEM";
import Panel from "@/components/Panel/Panel";
import Image from "@/components/Image/Image";
import { useTranslations } from "next-intl";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useIsMobile } from "@/utils/isMobile";
import "./page.scss";

export default function Home() {
  const b = useBEM("home");
  const tHome = useTranslations("Home");
  const tNavBar = useTranslations("NavBar");
  const isMobile = useIsMobile();

  return (
    <div className={b()}>
      <main>
        <div className={b("panel")}>
          <Panel
            icon="logotype"
            description={tHome("copy")}
            cta={tHome("artworksCta")}
            ctaHref="/artworks"
            ctaIcon={"arrow"}
            centerAlign={isMobile}
          />
          {isMobile && (
            <Link href={tNavBar("contact")}>
              <Button type="secondary" icon="arrow">
                {tHome("contactCta")}
              </Button>
            </Link>
          )}
        </div>
        <Image classname={b("hero")} src="/images/hero.png" alt="hero-image" />
      </main>
    </div>
  );
}
