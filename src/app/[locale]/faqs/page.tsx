"use client";
import FaqList from "@/components/FaqList/FaqList";
import Heading from "@/components/Heading/Heading";
import { FaqType } from "@/types/FaqType";
import { IconType } from "@/types/IconType";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/utils/isMobile";
import { useBEM } from "@/utils/component/useBEM";
import "./page.scss";

export default function FaqsPage() {
  const b = useBEM("faqs-page");
  const tFaqs = useTranslations("Faqs");
  const faqList = tFaqs.raw("faqsList");

  const isMobile = useIsMobile();

  return (
    <main className={b()}>
      <Heading
        classname={b("heading")}
        heading={tFaqs("heading")}
        copy={tFaqs("copy")}
        icon={isMobile}
      />
      {faqList.map((faq: FaqType, index: number) => (
        <div key={index}>
          <FaqList faqs={faq} icon={`faq${index + 1}` as IconType} />
        </div>
      ))}
      <br />
      <br />
    </main>
  );
}
