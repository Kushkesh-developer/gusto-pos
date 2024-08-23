import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Box, CssBaseline, Drawer, ThemeProvider, Toolbar } from "@mui/material";
import { theme } from "@/theme/theme";
import GSDrawer from "./_components/GSDrawer";
import GSHeader from "./_components/GSHeader";
import { DrawerProvider } from "@/context/DrawerProvider";
import "./globals.css";

const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GustoPOS",
  description: "GustoPOS is theme to make your life easier for POS admin teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight:"100vh"}}>
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html >
  );
}
