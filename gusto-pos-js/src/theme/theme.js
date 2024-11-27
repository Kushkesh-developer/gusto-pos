// theme.js
import { createTheme } from '@mui/material';
import { baseTheme } from './base-theme';
import { ColorSchemeEnum, colorVariants } from './color-variants';



export const createDynamicTheme = (
colorScheme = ColorSchemeEnum.OCEAN,
mode = 'light') =>
{
  const selectedColors = colorVariants[colorScheme];
  const textColors = selectedColors.text[mode];

  return createTheme({
    ...baseTheme,
    palette: {
      mode,
      primary: selectedColors.primary,
      secondary: selectedColors.secondary,
      text: {
        primary: textColors.primary,
        secondary: textColors.secondary,
        disabled: textColors.disabled
      },
      background: {
        default: mode === 'light' ? '#f7f7f7' : '#212121',
        paper: mode === 'light' ? '#fff' : '#101010'
      }
    },
    shape: {
      borderRadius: 8
    }
  });
};