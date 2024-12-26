'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createDynamicTheme } from '@/theme/theme';
import { ColorSchemeEnum } from '@/theme/color-variants';

const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    // Get the initial theme from localStorage or default to system
    if (typeof window === 'undefined') return 'system';
    return localStorage.getItem('theme') || 'system';
  });

  const [primaryColor, setPrimaryColor] = useState(ColorSchemeEnum.OCEAN);
  const [resolvedThemeMode, setResolvedThemeMode] = useState('light');

  // Use effect to handle system theme preference (client-side)
  useEffect(() => {
    if (themeMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      setResolvedThemeMode(systemTheme);
    } else {
      setResolvedThemeMode(themeMode);
    }
  }, [themeMode]);

  useEffect(() => {
    // Set theme to the document's root element
    document.documentElement.setAttribute('data-theme', resolvedThemeMode);
    localStorage.setItem('theme', themeMode);
  }, [resolvedThemeMode, themeMode]);

  const newTheme = useMemo(
    () => createDynamicTheme(primaryColor, resolvedThemeMode),
    [primaryColor, resolvedThemeMode],
  );

  const themeContextValue = useMemo(
    () => ({
      prefersDarkMode: resolvedThemeMode === 'dark',
      themeMode,
      changeThemeManually: (mode) => setThemeMode(mode),
      changePrimaryColor: setPrimaryColor,
    }),
    [resolvedThemeMode, themeMode, primaryColor],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MuiThemeProvider theme={newTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
