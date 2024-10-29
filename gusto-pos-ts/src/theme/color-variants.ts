// colorVariants.ts
import { PaletteColorOptions } from "@mui/material";

interface TextColors {
  primary: string;
  secondary: string;
  disabled: string;
}

interface ColorScheme {
  primary: PaletteColorOptions;
  secondary: PaletteColorOptions;
  text: {
    light: TextColors;
    dark: TextColors;
  };
}

type ColorVariants = Record<ColorSchemeEnum, ColorScheme>;

//ENUM is used outside of this file
/* eslint-disable no-unused-vars */
export enum ColorSchemeEnum {
  OCEAN = "ocean",
  BLUE = "blue",
  VIOLET = "violet",
}

export const colorVariants: ColorVariants = {
  [ColorSchemeEnum.OCEAN]: {
    primary: {
      light: "#4db8ff", // Soft ocean blue
      main: "#0077b6", // Main ocean blue
      dark: "#005f8f", // Dark ocean blue
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#00cfc1", // Soft teal accent
      main: "#00b4a2", // Main teal accent
      dark: "#008a7f", // Dark teal accent
      contrastText: "#ffffff",
    },
    text: {
      light: {
        primary: "#003847", // Dark blue text for ocean theme
        secondary: "#0077b6",
        disabled: "#b3d8e5",
      },
      dark: {
        primary: "#ffffff", // Light text for dark mode
        secondary: "#c3e0e8",
        disabled: "#7a9ca7",
      },
    },
  },
  [ColorSchemeEnum.BLUE]: {
    primary: {
      light: "#5c8dff", // Light blue
      main: "#1a73e8", // Core blue
      dark: "#134db2", // Dark blue
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#60a0ff", // Accent blue
      main: "#1a91ff",
      dark: "#1455b4",
      contrastText: "#ffffff",
    },
    text: {
      light: {
        primary: "#1a1f36", // Navy text
        secondary: "#1a73e8", // Bright blue
        disabled: "#8aa2c2",
      },
      dark: {
        primary: "#e3e4e7", // Light text for blue theme
        secondary: "#8da6e5",
        disabled: "#7a8ca1",
      },
    },
  },
  [ColorSchemeEnum.VIOLET]: {
    primary: {
      light: "#d6aaff", // Light violet
      main: "#9b59b6", // Main violet
      dark: "#7a3e99", // Dark violet
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#e0baff", // Lavender accent
      main: "#b785d6",
      dark: "#8f5ea6",
      contrastText: "#ffffff",
    },
    text: {
      light: {
        primary: "#32163d", // Dark violet for text
        secondary: "#9b59b6", // Bright violet
        disabled: "#b899c3",
      },
      dark: {
        primary: "#f3ebf7", // Light text for violet theme
        secondary: "#c7a4d2",
        disabled: "#a391ae",
      },
    },
  },
};

export const getColorArray = () => {
  return Object.entries(colorVariants).map(([key, value]) => ({
    label: key.toString().toUpperCase(),
    value: key as ColorSchemeEnum,
    hex: (value.primary as { main: string }).main, // Type assertion to ensure `main` exists
  }));
};
