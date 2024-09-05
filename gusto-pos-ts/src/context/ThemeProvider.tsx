// ThemeProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { theme, darkTheme } from '@/theme/theme';

interface ThemeContextProps {
  prefersDarkMode: boolean;
  changeThemeManually: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);


const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  let defaultMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(false);
  
  const newTheme = useMemo(() => (prefersDarkMode ? darkTheme : theme), [prefersDarkMode]);

  useEffect(() => {
    setPrefersDarkMode(defaultMode);
  }, [defaultMode]);

  
  function changeThemeManually() {
    setPrefersDarkMode(!prefersDarkMode);
    // prefersDarkMode  = !prefersDarkMode;
  }

  return (
    <ThemeContext.Provider value={{ prefersDarkMode, changeThemeManually }}>
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
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};
