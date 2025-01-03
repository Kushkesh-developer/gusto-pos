'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locale/en.json';
import es from '@/locale/es.json';







const defaultContext = {
  locale: 'en',
  setLocale: () => {},
  translate: (key) => key
};

const LocalizationContext = createContext(defaultContext);

const LANGUAGE = {
  EN: 'en',
  ES: 'es'
};

const locales = {
  [LANGUAGE.EN]: en,
  [LANGUAGE.ES]: es
};
const defaultLocale = LANGUAGE.EN;

export function LocalizationProvider({ children }) {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || defaultLocale);
  const [translations, setTranslations] = useState(locales[locale]);

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    setTranslations(locales[locale]);
    localStorage.setItem('locale', locale);
  }, [locale]);

  const translate = (key) => translations[key] || key;

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </LocalizationContext.Provider>);

}

// Custom hook to use the context
export const useLocalization = () => useContext(LocalizationContext);