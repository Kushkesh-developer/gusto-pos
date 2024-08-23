import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Box, Drawer, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import GSDrawer from "./_components/GSDrawer";
import GSHeader from "./_components/GSHeader";

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
          <Box sx={{ display: 'flex'}}>
            <GSDrawer />
            <Box sx={{ flex:"1 1 0%", flexGrow: 1}}>
              <GSHeader/>
              {children}
              </Box>
          </Box>
        </ThemeProvider></body>
    </html >
  );
}
