import { useBEM } from "@/utils/component/useBEM";
import { FilterType } from "@/types/FilterType";
import { TagType } from "@/types/TagType";
import { useRef, useState } from "react";
import { useOnCloseEvents } from "@/utils/onCloseEvents";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./FilterBar.scss";

/**
 * This component renders an interactive dropdown selector or horizontal tabs to filter content.
 * @param {FilterType[]} filters - The list of available categories to display in the menu.
 * @param {(tag: TagType) => void} onSelectTag - Callback function that notifies the parent page when the selection changes.
 * @param {"select" | "tabs"} [type] - Determines the visual appearance and interaction mode of the filter.
 */
type FilterBarProps = {
  filters: FilterType[];
  onSelectTag: (tag: TagType) => void;
  type?: "select" | "tabs";
};

export default function FilterBar({
  filters,
  onSelectTag,
  type = "select",
}: FilterBarProps) {
  const b = useBEM("filter-bar");

  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(filters[0].label);

  const selectRef = useRef<HTMLDivElement>(null);

  useOnCloseEvents(open, selectRef, () => setOpen(false));

  return (
    <div
      className={b(null, type)}
      ref={selectRef}
      onClick={() => setOpen(!open)}
    >
      {type == "select" && (
        <label className={b("label", type)}>
          <span>{selectedTag}</span>
          <SvgIcon classname={b("icon", type)} icon="arrow" size={12} />
        </label>
      )}
      {(open || type == "tabs") && (
        <ul className={b("menu", type)}>
          {filters.map((filter) => (
            <li
              key={filter.key}
              className={
                filter.label == selectedTag ? b("active", type) : undefined
              }
              onClick={() => {
                setSelectedTag(filter.label);
                setOpen(false);
                onSelectTag(filter.key);
              }}
            >
              {filter.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
