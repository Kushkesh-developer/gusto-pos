import React from "react";
import { styled } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { DrawerMenuButtonProps } from "@/types/DrawerTypes";

/**
 * Themed components created so you can configure them via createTheme().
 * use the name mentioned in the styled object
 /** */ 
const DrawerMenuButtonRoot = styled(ListItemButton, {
  name: 'MuiDrawerMenuButton',
  slot: 'root',
})<{
  isSubmenu: boolean;
  isSelected: boolean;
  isAccordion: boolean;
}>(({ theme, isSubmenu, isSelected, isAccordion }) => ({
  paddingLeft: isSubmenu ? theme.spacing(2) : theme.spacing(2),
  height: 44,
  marginLeft: isSubmenu ? theme.spacing(6) : theme.spacing(1),
  marginRight: theme.spacing(1),
  backgroundColor: isSelected ? theme.palette.primary.main : "transparent",
  color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  boxShadow: isSelected ? theme.shadows[1] : "none",
  '&:hover': {
    backgroundColor: isAccordion ? "transparent" : isSelected ? theme.palette.primary.light : theme.palette.action.hover,
  },
}));

const DrawerMenuButtonIcon = styled(ListItemIcon, {
  name: 'MuiDrawerMenuButton',
  slot: 'icon',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  color: isSelected ? theme.palette.primary.contrastText : theme.palette.primary.main,
  minWidth: 40,
}));

const DrawerMenuButtonText = styled(ListItemText, {
  name: 'MuiDrawerMenuButton',
  slot: 'text',
})<{ isSelected: boolean }>(({ theme, isSelected}) => ({
  '.MuiTypography-root': {
    fontSize: 14,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: isSelected ? theme.palette.primary.contrastText : theme.palette.primary.main
  },
}));

const DrawerMenuButton = ({
  menu,
  isSelected,
  onSelectMenu,
  isAccordion = false,
  isSubmenu = false,
}: DrawerMenuButtonProps) => {
  return (
    <DrawerMenuButtonRoot
      isSubmenu={isSubmenu}
      isSelected={isSelected}
      isAccordion={isAccordion}
      disableRipple={isAccordion}
      onClick={() => onSelectMenu(menu.path)}
    >
      {!isSubmenu && (
        <DrawerMenuButtonIcon isSelected={isSelected}>{menu.icon}</DrawerMenuButtonIcon>
      )}
      <DrawerMenuButtonText primary={menu.name} isSelected={isSelected}/>
    </DrawerMenuButtonRoot>
  );
};

export default DrawerMenuButton;
