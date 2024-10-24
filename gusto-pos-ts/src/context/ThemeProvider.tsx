"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { theme, darkTheme } from "@/theme/theme";
import { createTheme } from "@mui/material";
interface ThemeContextProps {
  prefersDarkMode: boolean;
  themeMode: "system" | "light" | "dark";
  changeThemeManually: (_mode: "system" | "light" | "dark") => void;
  changePrimaryColor: (_color: string) => void; // Add to context
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<"system" | "light" | "dark">(
    "system"
  );
  const [primaryColor, setPrimaryColor] = useState<string>("#1b3c73");

  const newTheme = useMemo(() => {
    const baseTheme =
      themeMode === "system"
        ? defaultMode
          ? darkTheme
          : theme
        : themeMode === "dark"
          ? darkTheme
          : theme;

    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        primary: {
          ...baseTheme.palette.primary,
          main: primaryColor,
        },
      },
    });
  }, [themeMode, defaultMode, primaryColor]);

  useEffect(() => {
    if (themeMode === "system") {
      setPrefersDarkMode(defaultMode);
    }
  }, [defaultMode, themeMode]);

  const changeThemeManually = (mode: "system" | "light" | "dark") => {
    setThemeMode(mode);
  };

  const changePrimaryColor = (color: string) => {
    let newColor;
    switch (color) {
      case "ocean":
        newColor = "#0d47a1";
        break;
      case "blue":
        newColor = "#1b3c73";
        break;
      case "violet":
        newColor = "#311b92";
        break;
      default:
        newColor = "#1b3c73";
    }
    setPrimaryColor(newColor);
  };

  return (
    <ThemeContext.Provider
      value={{
        prefersDarkMode,
        themeMode,
        changeThemeManually,
        changePrimaryColor,
      }}
    >
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
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
