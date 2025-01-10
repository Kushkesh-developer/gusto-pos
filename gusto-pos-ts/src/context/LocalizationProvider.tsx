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
  const [locale, setLocale] = useState<string>(defaultLocale);
  const [translations, setTranslations] = useState<Record<string, string>>(locales[locale]);

  useEffect(() => {
    // Ensure that localStorage is only accessed on the client side
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem('locale');
      if (storedLocale) {
        setLocale(storedLocale);
      }
    }
  }, []);

  useEffect(() => {
    setTranslations(locales[locale]);

    // Ensure localStorage is updated only on the client side
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

  if (!locale) {
    return null;
  }

  const translate = (key: string) => translations[key] || key;

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </LocalizationContext.Provider>
  );
}

// Custom hook to use the context
export const useLocalization = () => useContext(LocalizationContext);
