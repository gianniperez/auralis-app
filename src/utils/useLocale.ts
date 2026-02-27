import { useParams } from "next/navigation";

/**
 * Custom hook to retrieve the current active locale.
 * * @returns {"en" | "es"} The current language code.
 */
export function useLocale() {
  const params = useParams();

  const locale = params?.locale as string;

  if (locale === "es") return "es";

  return "en";
}
