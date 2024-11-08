"use client";

import { Rubik, DM_Sans, Lexend } from "next/font/google";

import { createTheme } from "@mui/material";

const roboto = Lexend({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});


export const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette: {
        primary: {
            light: '#2a4d87',
            main: '#1b3c73',
            dark: '#0a2350',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e38a40',
            main: '#d26f38',
            dark: '#c45c35',
            contrastText: '#000',
        },
        background: {
            default: '#f5f5f5',
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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontWeight: "lighter",
                    '& .MuiInputBase-input': {
                        padding: '14.5px 14px',
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
        // Add overrides for other components as needed
    },
});