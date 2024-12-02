// colorVariants.ts

//ENUM is used outside of this file
/* eslint-disable no-unused-vars */
export let ColorSchemeEnum = /*#__PURE__*/ (function (ColorSchemeEnum) {
  ColorSchemeEnum['OCEAN'] = 'ocean';
  ColorSchemeEnum['GREEN'] = 'green';
  ColorSchemeEnum['YELLOW'] = 'yellow';
  ColorSchemeEnum['VIOLET'] = 'violet';
  return ColorSchemeEnum;
})({});

export const colorVariants = {
  [ColorSchemeEnum.OCEAN]: {
    primary: {
      light: '#6093d1',
      main: '#3973b6',
      dark: '#2c5789',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#00cfc1',
      main: '#00b4a2',
      dark: '#008a7f',
      contrastText: '#ffffff',
    },
    text: {
      light: { primary: '#000', secondary: '#757575', disabled: '#ccc' },
      dark: { primary: '#fff', secondary: '#757575', disabled: '#ccc' },
    },
  },
  [ColorSchemeEnum.GREEN]: {
    primary: {
      light: '#00b2a3',
      main: '#009192',
      dark: '#006f6c',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#e0baff',
      main: '#b785d6',
      dark: '#8f5ea6',
      contrastText: '#ffffff',
    },
    text: {
      light: { primary: '#000', secondary: '#757575', disabled: '#ccc' },
      dark: { primary: '#fff', secondary: '#757575', disabled: '#ccc' },
    },
  },
  [ColorSchemeEnum.YELLOW]: {
    primary: {
      light: '#a8935f',
      main: '#c7b055',
      dark: '#a28842',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#60a0ff',
      main: '#1a91ff',
      dark: '#1455b4',
      contrastText: '#ffffff',
    },
    text: {
      light: { primary: '#000', secondary: '#757575', disabled: '#ccc' },
      dark: { primary: '#fff', secondary: '#757575', disabled: '#ccc' },
    },
  },
  [ColorSchemeEnum.VIOLET]: {
    primary: {
      light: '#9b64cc',
      main: '#7c39b6',
      dark: '#5c2c85',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#e0baff',
      main: '#b785d6',
      dark: '#8f5ea6',
      contrastText: '#ffffff',
    },
    text: {
      light: { primary: '#000', secondary: '#757575', disabled: '#ccc' },
      dark: { primary: '#fff', secondary: '#757575', disabled: '#ccc' },
    },
  },
};

export const getColorArray = () => {
  return Object.entries(colorVariants).map(([key, value]) => ({
    label: key.toString().toUpperCase(),
    value: key,
    hex: value.primary.main, // Type assertion to ensure `main` exists
  }));
};
