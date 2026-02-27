"use client";
import { ReactNode } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { socialLinks } from "@/data/socialLinks";
import SocialLinks from "../SocialLinks/SocialLinks";
import SvgIcon from "../SvgIcon/SvgIcon";
import Typography from "../Typography/Typography";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/utils/isMobile";
import Image from "../Image/Image";
import "./Footer.scss";

/**
 * The global footer component displaying links, copyright, and secondary navigation.
 * @param {ReactNode} [children] - Optional supplementary content to render inside the footer area.
 */
type FooterProps = {
  children?: ReactNode;
};

export default function Footer({}: FooterProps) {
  const b = useBEM("footer");
  const isMobile = useIsMobile();
  const tFooter = useTranslations("Footer");

  return (
    <footer className={b()}>
      {!isMobile && (
        <Image
          classname={b("lis")}
          src="/images/lis.png"
          alt="Flor de Lis"
          width={500}
          height={50}
        />
      )}
      <SvgIcon
        classname={b("logo")}
        icon={isMobile ? "isologo" : "imagotype"}
        size={isMobile ? 80 : 180}
      />
      <div className={b("content")}>
        <SocialLinks socialLinks={socialLinks} type="primary" />
        {!isMobile && <div className={b("decorative-bar")} />}
        <div className={b("copyright")}>
          <Typography text={tFooter("copyright")} />
        </div>
      </div>
    </footer>
  );
}
