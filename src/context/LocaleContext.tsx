"use client";
import { createContext, useContext, useState } from "react";

type Locale = "en" | "es";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined,
);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useGlobalLocale() {
  return useContext(LocaleContext);
}
