// baseTheme.ts

import { Poppins } from "next/font/google";

const font = Poppins({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap"
});

export const baseTheme = {
  typography: {
    fontFamily: font.style.fontFamily,
    h1: {
      fontSize: "2.5rem"
    },
    h6: {
      fontSize: "1.1rem"
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "normal",
          textTransform: "none"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {}
    }
  }
};