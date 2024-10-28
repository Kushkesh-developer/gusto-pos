"use client";

import { Lexend } from "next/font/google";
import { createTheme, ThemeOptions } from "@mui/material";

const font = Lexend({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const componentStyling = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontWeight: "lighter",
        "& .MuiInputBase-input": {
          padding: "14.5px 14px",
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        // fontFamily: 'Rubik, Arial, sans-serif',
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        "& .MuiInputBase-input": {
          padding: "14.5px 14px",
        },
      },
    },
  },
};

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: font.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxSizing: "border-box",
          backgroundColor: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "normal",
          textTransform: "none",
        },
      },
    },
    ...componentStyling,
  },
};

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "light",
    primary: {
      light: "#0693e3",
      main: "#0693e3",
      dark: "#0693e3",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f1ec69",
      main: "#ecba00",
      dark: "#ea7800",
      contrastText: "#000",
    },
    text: {
      primary: "#000",
      secondary: "#757575",
      disabled: "#ccc",
    },
    background: {
      default: "#f7f7f7",
      paper: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "dark",
    primary: {
      light: "#0693e3",
      main: "#0693e3",
      dark: "#0693e3",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f1ec69",
      main: "#ecba00",
      dark: "#ea7800",
      contrastText: "#000",
    },
    text: {
      primary: "#fff",
      secondary: "#757575",
      disabled: "#ccc",
    },
    background: {
      default: "#212121",
      paper: "#101010",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: "#fff",
          borderColor: "#acacac",
        },
      },
    },
  },
});
