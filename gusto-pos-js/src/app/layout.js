
import React from 'react';
import { Box } from '@mui/material';
import './globals.css';
import { LocalizationProvider } from '@/context/LocalizationProvider';
import ThemeProvider from '@/context/ThemeProvider';
import { DrawerProvider } from '@/context/DrawerProvider';
export const metadata = {
  title: 'GustoPOS',
  description: 'GustoPOS is theme to make your life easier for POS admin teams'
};

export default function RootLayout({
  children


}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="92x92" href="/favicon/favicon-92x92.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/web-app-manifest-192x192.png" />

        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      </head>
      {/* <Head>
         <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head> */}
      <body>
        <ThemeProvider>
          <DrawerProvider>
            <LocalizationProvider>
              <Box
                sx={{
                  display: 'flex',
                  minHeight: '100vh',
                  backgroundColor: 'background.default'
                }}>

                {children}
              </Box>
            </LocalizationProvider>
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>);

}