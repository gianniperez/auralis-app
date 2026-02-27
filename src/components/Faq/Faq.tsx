import { useBEM } from "@/utils/component/useBEM";
import { SectionType } from "@/types/SectionType";
import Typography from "../Typography/Typography";
import { useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./Faq.scss";

/** An interactive accordion-style component used to display a question and its corresponding answer.
 * It toggles the visibility of the "copy" text when the user clicks on the header.
 * @param {SectionType} [faq] - An object containing the content data (heading and copy).
 */
type FaqProps = {
  faq: SectionType;
};

export default function Faq({ faq }: FaqProps) {
  const b = useBEM("faq");
  const [open, setOpen] = useState(false);

  return (
    <div className={b(null, open ? "open" : undefined)}>
      <div onClick={() => setOpen(!open)}>
        <div className={b("label")}>
          <Typography tag="h4" text={faq.heading} />
          <SvgIcon icon="next" size={14} />
        </div>
        {open && <Typography text={faq.copy} />}
        <div className={b("decorative-bar")} />
      </div>
    </div>
  );
}
