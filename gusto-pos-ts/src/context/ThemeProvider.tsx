'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createDynamicTheme } from '@/theme/theme';
import { ColorSchemeEnum } from '@/theme/color-variants';

interface ThemeContextProps {
  prefersDarkMode: boolean;
  themeMode: 'system' | 'light' | 'dark';
  changeThemeManually: (_mode: 'system' | 'light' | 'dark') => void;
  changePrimaryColor: (_color: ColorSchemeEnum) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>(() => {
    // Get the initial theme from localStorage or default to system
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme') as 'system' | 'light' | 'dark') || 'system';
  });

  const [primaryColor, setPrimaryColor] = useState<ColorSchemeEnum>(ColorSchemeEnum.OCEAN);
  const [resolvedThemeMode, setResolvedThemeMode] = useState<'light' | 'dark'>('light');

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
      changeThemeManually: (mode: 'system' | 'light' | 'dark') => setThemeMode(mode),
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
