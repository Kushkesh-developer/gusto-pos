'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createDynamicTheme } from '@/theme/theme';
import { ColorSchemeEnum } from '@/theme/color-variants';








const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }) => {
  let defaultDarkMode = false;

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    defaultDarkMode = true;
  }
  const [themeMode, setThemeMode] = useState('system');
  const [primaryColor, setPrimaryColor] = useState(ColorSchemeEnum.OCEAN);

  const prefersDarkMode = themeMode === 'system' ? defaultDarkMode : themeMode === 'dark';
  const resolvedThemeMode = prefersDarkMode ? 'dark' : 'light';

  const newTheme = useMemo(
    () => createDynamicTheme(primaryColor, resolvedThemeMode),
    [primaryColor, resolvedThemeMode]
  );

  const themeContextValue = useMemo(
    () => ({
      prefersDarkMode,
      themeMode,
      changeThemeManually: setThemeMode,
      changePrimaryColor: setPrimaryColor
    }),
    [prefersDarkMode, themeMode, primaryColor]
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