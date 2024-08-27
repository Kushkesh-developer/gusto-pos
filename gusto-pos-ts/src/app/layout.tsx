import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
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
