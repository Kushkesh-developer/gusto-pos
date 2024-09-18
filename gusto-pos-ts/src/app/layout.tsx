import type { Metadata } from "next";
import { Box } from "@mui/material";
import "./globals.css";
import { LocalizationProvider } from "@/context/LocalizationProvider";
import ThemeProvider from "@/context/ThemeProvider";

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
      <body>
        <ThemeProvider>
          <LocalizationProvider>
            <Box
              sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "background.default",
              }}
            >
              {children}
            </Box>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
