import { useRef, useState } from "react";
import { useBEM } from "@/utils/component/useBEM";
import { useOnCloseEvents } from "@/utils/onCloseEvents";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./Select.scss";

/**
 * A custom dropdown select component designed with BEM and custom styling.
 * Useful as a styled alternative to native HTML <select>.
 * @param {{ label: string; value: string }[]} options - Array of available selectable choices.
 * @param {(selected: { label: string; value: string }) => void} [onSelectOption] - Callback triggered upon option selection.
 * @param {{ label: string; value: string }} [defaultValue] - The pre-selected active option.
 */
type SelectProps = {
  options: { label: string; value: string }[];
  onSelectOption?: (selected: { label: string; value: string }) => void;
  defaultValue?: { label: string; value: string };
};

export default function Select({
  options,
  onSelectOption,
  defaultValue,
}: SelectProps) {
  const b = useBEM("select");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue ?? options[0]);
  const selectRef = useRef<HTMLDivElement>(null);

  useOnCloseEvents(open, selectRef, () => setOpen(false));

  return (
    <div className={b()} ref={selectRef}>
      <div
        className={b("label", open ? "open" : undefined)}
        onClick={() => setOpen(!open)}
      >
        {selected.label}
        <SvgIcon
          classname={b("arrow", open ? "open" : undefined)}
          icon="next"
          size={12}
        />
      </div>
      {open && (
        <ul className={b("menu")}>
          {options.map((option) =>
            option.value !== selected.value &&
            option.value !== options[0].value ? (
              <li
                key={option.value}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                  onSelectOption?.(option);
                }}
              >
                {option.label}
              </li>
            ) : undefined,
          )}
        </ul>
      )}
    </div>
  );
}
