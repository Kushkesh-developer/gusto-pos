'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createDynamicTheme } from '@/theme/theme';
import { ColorSchemeEnum } from '@/theme/color-variants';

export type ThemeModeType = 'system' | 'light' | 'dark';

interface ThemeContextProps {
  prefersDarkMode: boolean;
  themeMode: ThemeModeType;
  changeThemeManually: (_mode: ThemeModeType) => void;
  changePrimaryColor: (_color: ColorSchemeEnum) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const THEME_STORAGE_KEY = 'app-theme-mode';
const COLOR_STORAGE_KEY = 'app-primary-color';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeModeType>(() => {
    // Get the initial theme from localStorage or default to system
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeModeType) || 'system';
  });

  const color = localStorage.getItem(COLOR_STORAGE_KEY) as ColorSchemeEnum;

  const [primaryColor, setPrimaryColor] = useState<ColorSchemeEnum>(color || ColorSchemeEnum.OCEAN);
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
    document.documentElement.setAttribute('data-theme', resolvedThemeMode);
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [resolvedThemeMode, themeMode]);

  useEffect(() => {
    localStorage.setItem(COLOR_STORAGE_KEY, primaryColor);
  }, [primaryColor]);

  const newTheme = useMemo(
    () => createDynamicTheme(primaryColor, resolvedThemeMode),
    [primaryColor, resolvedThemeMode],
  );

  const themeContextValue = useMemo(
    () => ({
      prefersDarkMode: resolvedThemeMode === 'dark',
      themeMode,
      changeThemeManually: (mode: ThemeModeType) => setThemeMode(mode),
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
