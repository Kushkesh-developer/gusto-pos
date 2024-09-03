// ThemeProvider.tsx
"use client";
import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { theme, darkTheme } from '@/theme/theme';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  console.log("🚀 ~ prefersDarkMode:", prefersDarkMode)

  const newTheme = useMemo(() => (prefersDarkMode ? darkTheme : theme), [prefersDarkMode]);

  return (
    <MuiThemeProvider theme={newTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
