"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LocalizationContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  translate: (key: string) => string;
}

const defaultContext: LocalizationContextProps = {
  locale: 'en',
  setLocale: () => { },
  translate: (key) => { return key }
};

const LocalizationContext = createContext<LocalizationContextProps>(defaultContext);


export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});


  // Load translations based on locale
  useEffect(() => {
    const loadTranslations = async () => {
      const response = await fetch(`/locales/${locale}.json`);
      const data = await response.json();
      setTranslations(data);
    };

    loadTranslations();
  }, [locale]);

  function translateValues(key: string) {
    return translations[key] || key;
  }

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, translate: translateValues }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Custom hook to use the context
export const useLocalization = () => useContext(LocalizationContext);
