import { theme } from "@/theme/theme";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getSelectedTab = (): string => window.location.pathname;

export const handleSelectMenu = (
  path: string,
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
) => {
  setSelectedTab(path);
};

export const getButtonStyles = (isSelected: boolean, isAccordion?: boolean) => ({
  backgroundColor: isSelected ? theme.palette.primary.main : "transparent",
  color: isSelected ? theme.palette.primary.contrastText : theme.palette.primary.main,
  ":hover": {
    backgroundColor: isAccordion? "transparent": isSelected ? theme.palette.primary.light : "#0000000a",
  },
  boxShadow: isSelected ? 1 : 0,
  borderRadius: 1,
});
