import { useBEM } from "@/utils/component/useBEM";
import { SectionType } from "@/types/SectionType";
import Button from "../Button/Button";
import FeatureItem from "../FeatureItem/FeatureItem";
import Link from "next/link";
import "./SuccessView.scss";

/**
 * A confirmation view component shown after successful form submissions
 * or completed actions, displaying a positive message and a CTA to return or continue.
 * @param {SectionType} message - Localized success heading and description.
 * @param {string} cta - Text label for the "Go back" or "Continue" action button.
 */
type SuccessViewProps = {
  message: SectionType;
  cta: string;
};

export default function SuccessView({ message, cta }: SuccessViewProps) {
  const b = useBEM("success-view");

  return (
    <div className={b()}>
      <FeatureItem
        classname={b("success")}
        icon="success"
        heading={message.heading}
        subheading=""
        copy={message.copy}
      />
      <Link href="/">
        <Button classname={b("btn")}>{cta}</Button>
      </Link>
    </div>
  );
}
