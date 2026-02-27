import { FilterType } from "@/types/FilterType";

export const getFilters = (t: (key: string) => string): FilterType[] => [
  { key: "All", label: t("filterAll") },
  { key: "Portraits", label: t("servicesList.portraits") },
  { key: "Character Design", label: t("servicesList.characterDesign") },
  { key: "RPG & Video Game Art", label: t("servicesList.gameArt") },
  {
    key: "Book Cover Illustration",
    label: t("servicesList.bookIllustration"),
  },
  { key: "Landscapes", label: t("servicesList.landscapes") },
];
