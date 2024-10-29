// baseTheme.ts
import { ThemeOptions } from "@mui/material";
import { Lexend } from "next/font/google";

const font = Lexend({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const baseTheme: ThemeOptions = {
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
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "normal",
          textTransform: "none",
        },
      },
    },
  },
};
