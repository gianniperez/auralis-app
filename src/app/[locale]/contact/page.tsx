"use client";
import ContactForm from "@/components/ContactForm/ContactForm";
import Heading from "@/components/Heading/Heading";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { personalData } from "@/data/personalData";
import { socialLinks } from "@/data/socialLinks";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/utils/isMobile";
import { useBEM } from "@/utils/component/useBEM";
import "./page.scss";

export default function ContactPage() {
  const b = useBEM("contact-page");

  const tContact = useTranslations("ContactForm");
  const isMobile = useIsMobile();

  return (
    <main>
      {isMobile ? (
        <div className={b()}>
          <Heading
            classname={b("heading")}
            heading={tContact("heading")}
            copy={tContact("copy")}
            icon={true}
          />
          <div className={b("form")}>
            <ContactForm />
          </div>
          <Heading
            classname={b("connect-heading")}
            heading={tContact("connectHeading")}
            icon={true}
          />
          <SocialLinks socialLinks={personalData} type="secondary" />
          <SocialLinks socialLinks={socialLinks} type="terciary" />
        </div>
      ) : (
        <div className={b()}>
          <div className={b("info")}>
            <Heading
              classname={b("heading")}
              heading={tContact("heading")}
              copy={tContact("copy")}
            />
            <SocialLinks socialLinks={personalData} type="secondary" />
            <div className={b("social-links")}>
              <SocialLinks socialLinks={socialLinks} type="terciary" />
            </div>
          </div>
          <div className={b("form")}>
            <ContactForm />
          </div>
        </div>
      )}
    </main>
  );
}
