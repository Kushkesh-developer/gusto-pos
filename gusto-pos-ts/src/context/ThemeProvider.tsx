// ThemeProvider.tsx
"use client";
import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { theme, darkTheme } from '@/theme/theme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const newTheme = useMemo(() => (prefersDarkMode ? darkTheme : theme), [prefersDarkMode]);

  return (
    <MuiThemeProvider theme={newTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
