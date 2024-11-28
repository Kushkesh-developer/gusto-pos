

export const getSelectedTab = () => window.location.pathname;

const themeStyle = (theme) => {
  const themes = {
    light: {
      color: theme.palette.grey[800],
      colorSelected: theme.palette.common.white,
      backgroundColor: 'transparent',
      backgroundColorSelected: theme.palette.primary.main
    },
    dark: {
      color: theme.palette.grey[300],
      colorSelected: theme.palette.common.white,
      backgroundColor: 'transparent',
      backgroundColorSelected: theme.palette.primary.main
    }
  };
  return themes[theme?.palette.mode];
};

export const getButtonStyles = (theme, isSelected, isAccordion) => {
  const selectedTheme = themeStyle(theme);
  return {
    backgroundColor: isSelected ?
    selectedTheme.backgroundColorSelected :
    selectedTheme.backgroundColor,
    color: isSelected ? selectedTheme.colorSelected : selectedTheme.color,
    hoverBackground: isAccordion ?
    'transparent' :
    isSelected ?
    theme.palette.primary.dark :
    theme.palette.action.hover
  };
};