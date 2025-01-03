'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import en from '@/locale/en.json';
import es from '@/locale/es.json';

interface LocalizationContextProps {
  locale: string;
  setLocale: (_locale: string) => void;
  translate: (_key: string) => string;
}

const defaultContext: LocalizationContextProps = {
  locale: 'en',
  setLocale: () => {},
  translate: (key) => key,
};

const LocalizationContext = createContext<LocalizationContextProps>(defaultContext);

const LANGUAGE = {
  EN: 'en',
  ES: 'es',
};

const locales: { [key: string]: Record<string, string> } = {
  [LANGUAGE.EN]: en,
  [LANGUAGE.ES]: es,
};
const defaultLocale = LANGUAGE.EN;

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>(localStorage.getItem('locale') || defaultLocale);
  const [translations, setTranslations] = useState<Record<string, string>>(locales[locale]);

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

  const translate = (key: string) => translations[key] || key;

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </LocalizationContext.Provider>
  );
}

// Custom hook to use the context
export const useLocalization = () => useContext(LocalizationContext);
