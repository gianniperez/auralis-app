import { ReactNode, useRef, useState } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { useOnCloseEvents } from "@/utils/onCloseEvents";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useIsMobile } from "@/utils/isMobile";
import "./Modal.scss";

/**
 * This component renders a modal overlay with navigation and close controls.
 * @param {boolean} open - Toggles the visibility and transition state of the modal.
 * @param {ReactNode} children - The content to be displayed inside the modal container.
 * @param {() => void} onClose - Callback function to handle closing the modal.
 * @param {() => void} onPreviousPage - Optional callback for navigating to the previous item.
 * @param {() => void} onNextPage - Optional callback for navigating to the next item.
 */
type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
};

export default function Modal({
  open,
  children,
  onClose,
  onPreviousPage,
  onNextPage,
}: ModalProps) {
  const b = useBEM("modal");

  const modalRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useIsMobile();

  useOnCloseEvents(open, modalRef, onClose);

  return (
    <div className={b(null, open ? "open" : "close")}>
      <div
        className={b("container", isFullscreen ? "fullscreen" : "")}
        ref={modalRef}
      >
        <div className={b("icons")}>
          {!isMobile && (
            <SvgIcon
              icon={isFullscreen ? "fullscreenExit" : "fullscreen"}
              size={24}
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(!isFullscreen);
              }}
            />
          )}
          <div className={b("right-icons")}>
            <SvgIcon icon="previous" size={16} onClick={onPreviousPage} />
            <SvgIcon icon="next" size={16} onClick={onNextPage} />
            <SvgIcon icon="close" size={16} onClick={onClose} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
