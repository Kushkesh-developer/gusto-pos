"use client";
import React, {
  createContext,
  useContext,
  useState,

  useEffect } from
"react";
import en from "@/locale/en.json";
import es from "@/locale/es.json";






const defaultContext = {
  locale: "en",
  setLocale: () => {},
  translate: (key) => {
    return key;
  }
};

const LocalizationContext =
createContext(defaultContext);

const LANGUAGE = {
  EN: "en",
  ES: "es"
};

const locales = {
  [LANGUAGE.EN]: en,
  [LANGUAGE.ES]: es
};
const defaultLocale = LANGUAGE.EN;

export function LocalizationProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale);
  const [translations, setTranslations] = useState(
    locales[defaultLocale]
  );

  useEffect(() => {
    setTranslations(locales[locale]);
  }, []);

  useEffect(() => {
    setTranslations(locales[locale]);
  }, [locale]);

  function translateValues(key) {
    return translations[key] || key;
  }

  return (
    <LocalizationContext.Provider
      value={{ locale, setLocale, translate: translateValues }}>

      {children}
    </LocalizationContext.Provider>);

}

// Custom hook to use the context
export const useLocalization = () => useContext(LocalizationContext);