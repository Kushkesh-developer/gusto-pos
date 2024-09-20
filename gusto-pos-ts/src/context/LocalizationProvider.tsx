"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import en from "@/locale/en.json";
import es from "@/locale/es.json";
interface LocalizationContextProps {
  locale: string;
  setLocale: (_locale: string) => void;
  translate: (_key: string) => string;
  setLocale: (_locale: string) => void;
  translate: (_key: string) => string;
}

const defaultContext: LocalizationContextProps = {
  locale: "en",
  setLocale: () => {},
  translate: (key) => {
    return key;
  },
  locale: "en",
  setLocale: () => {},
  translate: (key) => {
    return key;
  },
};

const LocalizationContext =
  createContext<LocalizationContextProps>(defaultContext);
const LocalizationContext =
  createContext<LocalizationContextProps>(defaultContext);

const LANGUAGE = {
  EN: "en",
  ES: "es",
};
  EN: "en",
  ES: "es",
};

const locales: { [key: string]: Record<string, string> } = {
  [LANGUAGE.EN]: en,
  [LANGUAGE.ES]: es,
};
const locales: { [key: string]: Record<string, string> } = {
  [LANGUAGE.EN]: en,
  [LANGUAGE.ES]: es,
};
const defaultLocale = LANGUAGE.EN;

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>(defaultLocale);
  const [translations, setTranslations] = useState<Record<string, string>>(
    locales[defaultLocale]
  );

  useEffect(() => {
    setTranslations(locales[locale]);
  }, []);

  useEffect(() => {
    setTranslations(locales[locale]);
  }, [locale]);

  function translateValues(key: string) {
    return translations[key] || key;
  }

  return (
    <LocalizationContext.Provider
      value={{ locale, setLocale, translate: translateValues }}
    >
    <LocalizationContext.Provider
      value={{ locale, setLocale, translate: translateValues }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}
}

// Custom hook to use the context
export const useLocalization = () => useContext(LocalizationContext);
