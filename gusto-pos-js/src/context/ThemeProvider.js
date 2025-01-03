'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createDynamicTheme } from '@/theme/theme';
import { ColorSchemeEnum } from '@/theme/color-variants';










const ThemeContext = createContext(undefined);

const THEME_STORAGE_KEY = 'app-theme-mode';
const COLOR_STORAGE_KEY = 'app-primary-color';

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    // Get the initial theme from localStorage or default to system
    if (typeof window === 'undefined') return 'system';
    return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
  });

  const color = localStorage.getItem(COLOR_STORAGE_KEY);

  const [primaryColor, setPrimaryColor] = useState(color || ColorSchemeEnum.OCEAN);
  const [resolvedThemeMode, setResolvedThemeMode] = useState('light');

  // Use effect to handle system theme preference (client-side)
  useEffect(() => {
    if (themeMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ?
      'dark' :
      'light';
      setResolvedThemeMode(systemTheme);
    } else {
      setResolvedThemeMode(themeMode);
    }
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedThemeMode);
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [resolvedThemeMode, themeMode]);

  useEffect(() => {
    localStorage.setItem(COLOR_STORAGE_KEY, primaryColor);
  }, [primaryColor]);

  const newTheme = useMemo(
    () => createDynamicTheme(primaryColor, resolvedThemeMode),
    [primaryColor, resolvedThemeMode]
  );

  const themeContextValue = useMemo(
    () => ({
      prefersDarkMode: resolvedThemeMode === 'dark',
      themeMode,
      changeThemeManually: (mode) => setThemeMode(mode),
      changePrimaryColor: setPrimaryColor
    }),
    [resolvedThemeMode, themeMode, primaryColor]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MuiThemeProvider theme={newTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>);

};

export default ThemeProvider;

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};