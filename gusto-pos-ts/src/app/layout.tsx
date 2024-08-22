import type { Metadata } from "next";
import { Rubik, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";

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
        <ThemeProvider theme={theme}>{children}</ThemeProvider></body>
    </html>
  );
}
