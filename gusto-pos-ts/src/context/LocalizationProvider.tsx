'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import en from '@/locale/en.json';
import es from '@/locale/es.json';

interface LocalizationContextProps {
  locale: string;
  setLocale: (_locale: string) => void;
  translate: (_key: string) => string;
}

// Define language constants
const LANGUAGE = {
  EN: 'en',
  ES: 'es',
} as const;

const locales: { [key: string]: Record<string, string> } = {
  [LANGUAGE.EN]: en,
  [LANGUAGE.ES]: es,
};

const defaultLocale = LANGUAGE.EN;

// Helper function to map uppercase locale to lowercase
const mapToLowerCase = (locale: string): string => {
  return locale.toLowerCase();
};

// Helper function to get the initial locale
const getInitialLocale = (): string => {
  if (typeof window === 'undefined') return defaultLocale;

  const storedLocale = localStorage.getItem('locale') as keyof typeof LANGUAGE | null;
  const lowerCaseLocale = storedLocale ? mapToLowerCase(storedLocale) : null;

  // Ensure `lowerCaseLocale` matches `LANGUAGE` values
  return lowerCaseLocale && (Object.values(LANGUAGE) as string[]).includes(lowerCaseLocale)
    ? lowerCaseLocale
    : defaultLocale;
};

// Default context values
const defaultContext: LocalizationContextProps = {
  locale: defaultLocale,
  setLocale: () => {},
  translate: (key) => key,
};

const LocalizationContext = createContext<LocalizationContextProps>(defaultContext);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  // Initialize locale and translations
  const [locale, setLocale] = useState<string>(() => getInitialLocale());
  const [translations, setTranslations] = useState<Record<string, string>>(
    () => locales[getInitialLocale()],
  );

  useEffect(() => {
    setTranslations(locales[locale]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

  const translate = (key: string) => translations[key] || key;

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export const useLocalization = () => useContext(LocalizationContext);
