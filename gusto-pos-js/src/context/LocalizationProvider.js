"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const LocalizationContext = createContext({
  locale: 'en',
  setLocale: () => {},
  translate: {}
});

export const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const response = await fetch(`/locales/${locale}.json`);
      const data = await response.json();
      setTranslations(data);
    };
    
    loadTranslations();
  }, [locale]);

  function translateValues(key) {
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
