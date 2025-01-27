'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createDynamicTheme } from '@/theme/theme';
import { ColorSchemeEnum } from '@/theme/color-variants';










const ThemeContext = createContext(undefined);

const THEME_STORAGE_KEY = 'app-theme-mode';
const COLOR_STORAGE_KEY = 'app-primary-color';

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(null);
  const [primaryColor, setPrimaryColor] = useState(null);
  const [resolvedThemeMode, setResolvedThemeMode] = useState('light');

  // Load themeMode and primaryColor from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedThemeMode =
      localStorage.getItem(THEME_STORAGE_KEY) || 'system';
      const storedPrimaryColor =
      localStorage.getItem(COLOR_STORAGE_KEY) || ColorSchemeEnum.OCEAN;

      setThemeMode(storedThemeMode);
      setPrimaryColor(storedPrimaryColor);
    }
  }, []);

  useEffect(() => {
    if (themeMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ?
      'dark' :
      'light';
      setResolvedThemeMode(systemTheme);
    } else if (themeMode) {
      setResolvedThemeMode(themeMode);
    }
  }, [themeMode]);

  useEffect(() => {
    if (themeMode) {
      document.documentElement.setAttribute('data-theme', resolvedThemeMode);
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }
  }, [resolvedThemeMode, themeMode]);

  useEffect(() => {
    if (primaryColor) {
      localStorage.setItem(COLOR_STORAGE_KEY, primaryColor);
    }
  }, [primaryColor]);

  const newTheme = useMemo(
    () =>
    primaryColor && resolvedThemeMode ?
    createDynamicTheme(primaryColor, resolvedThemeMode) :
    null,
    [primaryColor, resolvedThemeMode]
  );

  const themeContextValue = useMemo(
    () =>
    themeMode && primaryColor ?
    {
      prefersDarkMode: resolvedThemeMode === 'dark',
      themeMode,
      changeThemeManually: (mode) => setThemeMode(mode),
      changePrimaryColor: setPrimaryColor
    } :
    undefined,
    [resolvedThemeMode, themeMode, primaryColor]
  );

  // Avoid rendering children until themeMode and primaryColor are loaded
  if (!themeMode || !primaryColor || !newTheme || !themeContextValue) {
    return null; // Or a loading spinner
  }

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