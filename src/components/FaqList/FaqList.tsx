import { useBEM } from "@/utils/component/useBEM";
import Faq from "../Faq/Faq";
import { FaqType } from "@/types/FaqType";
import Typography from "../Typography/Typography";
import { useState } from "react";
import { SectionType } from "@/types/SectionType";
import { IconType } from "@/types/IconType";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./FaqList.scss";

/**
 * Acts as a container for a group of FAQ items. It displays a category header
 * with an icon and toggles the visibility of the entire list of questions.
 * @param {FaqType} faqs - The data object containing the category heading and an array of question objects.
 * @param {IconType} icon - The leading icon type to represent the FAQ category.
 */
type FaqListProps = {
  faqs: FaqType;
  icon: IconType;
};

export default function FaqList({ faqs, icon }: FaqListProps) {
  const b = useBEM("faq-list");
  const [open, setOpen] = useState(false);

  return (
    <div className={b(null, open ? "open" : undefined)}>
      <div className={b("label")} onClick={() => setOpen(!open)}>
        <SvgIcon classname={b("icon")} icon={icon} size={20} />
        <Typography tag="h3" text={faqs.heading} />
        <SvgIcon
          classname={b("action")}
          icon={open ? "sub" : "add"}
          size={20}
        />
      </div>
      {faqs.questions.map((question: SectionType, index: number) => (
        <div key={index}>{open && <Faq faq={question} />}</div>
      ))}
    </div>
  );
}
