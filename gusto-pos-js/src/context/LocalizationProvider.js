'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locale/en.json';
import es from '@/locale/es.json';







// Define language constants
const LANGUAGE = {
  EN: 'en',
  ES: 'es'
};

const locales = {
  [LANGUAGE.EN]: en,
  [LANGUAGE.ES]: es
};

const defaultLocale = LANGUAGE.EN;

// Helper function to map uppercase locale to lowercase
const mapToLowerCase = (locale) => {
  return locale.toLowerCase();
};

// Helper function to get the initial locale
const getInitialLocale = () => {
  if (typeof window === 'undefined') return defaultLocale;

  const storedLocale = localStorage.getItem('locale');
  const lowerCaseLocale = storedLocale ? mapToLowerCase(storedLocale) : null;

  // Ensure `lowerCaseLocale` matches `LANGUAGE` values
  return lowerCaseLocale && Object.values(LANGUAGE).includes(lowerCaseLocale) ?
  lowerCaseLocale :
  defaultLocale;
};

// Default context values
const defaultContext = {
  locale: defaultLocale,
  setLocale: () => {},
  translate: (key) => key
};

const LocalizationContext = createContext(defaultContext);

export function LocalizationProvider({ children }) {
  // Initialize locale and translations
  const [locale, setLocale] = useState(() => getInitialLocale());
  const [translations, setTranslations] = useState(
    () => locales[getInitialLocale()]
  );

  useEffect(() => {
    setTranslations(locales[locale]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

  const translate = (key) => translations[key] || key;

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </LocalizationContext.Provider>);

}

export const useLocalization = () => useContext(LocalizationContext);