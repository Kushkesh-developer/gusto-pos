import { theme } from "@/theme/theme";
import { Theme } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getSelectedTab = (): string => window.location.pathname;

export const handleSelectMenu = (
  path: string,
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
) => {
  setSelectedTab(path);
};

const themeStyle = {
  light: {
    color: theme.palette.primary.main,
    colorSelected: theme.palette.common.white,
    backgroundColor: "transparent",
    backgroundColorSelected: theme.palette.primary.main,
  },
  dark: {
    color: theme.palette.grey[300],
    colorSelected: theme.palette.common.white,
    backgroundColor: "transparent",
    backgroundColorSelected: theme.palette.primary.main,
  },
}

export const getButtonStyles = (theme: Theme, isSelected: boolean, isAccordion?: boolean) => {
  const selectedTheme = themeStyle[theme?.palette.mode];
  return({
  backgroundColor: isSelected ? selectedTheme.backgroundColorSelected : selectedTheme.backgroundColor,
  color: isSelected ? selectedTheme.colorSelected : selectedTheme.color,
  hoverBackground: isAccordion ? "transparent" : isSelected ? theme.palette.primary.light : theme.palette.action.hover
})};
