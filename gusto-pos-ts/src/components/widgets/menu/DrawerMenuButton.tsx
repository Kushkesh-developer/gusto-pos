import React from "react";
import { styled } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { DrawerMenuButtonProps } from "@/types/DrawerTypes";
import { getButtonStyles } from "@/utils/drawerUtils";
import { useDrawerContext } from "@/context/DrawerProvider";

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
}>(({ theme, isSubmenu, isSelected, isAccordion }) => {

  const style = getButtonStyles(theme, isSelected, isAccordion);

  return (
    {
      paddingLeft: isSubmenu ? theme.spacing(2) : theme.spacing(2),
      height: 44,
      marginLeft: isSubmenu ? theme.spacing(6) : theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: style.backgroundColor,
      color: style.color,
      borderRadius: theme.shape.borderRadius,
      boxShadow: isSelected ? theme.shadows[1] : "none",
      marginTop: 1,
      '&:hover': {
        backgroundColor: style.hoverBackground,
      },
    }
  )
});

const DrawerMenuButtonIcon = styled(ListItemIcon, {
  name: 'MuiDrawerMenuButton',
  slot: 'icon',
})<{ isSelected: boolean }>(({ theme, isSelected }) => {

  const style = getButtonStyles(theme, isSelected);

  return (
    {
      color: style.color,
      minWidth: 40,
    }
  )
});

const DrawerMenuButtonText = styled(ListItemText, {
  name: 'MuiDrawerMenuButton',
  slot: 'text',
})<{ isSelected: boolean }>(({ theme, isSelected }) => {

  const style = getButtonStyles(theme, isSelected);

  return (
    {
      '.MuiTypography-root': {
        fontSize: 14,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: style.color,
      },
    }
  )
});

const DrawerMenuButton = ({
  menu,
  isSelected,
  isAccordion = false,
  isSubmenu = false,
}: DrawerMenuButtonProps) => {
  const { handleTabChange} = useDrawerContext();

  return (
    <DrawerMenuButtonRoot
      isSubmenu={isSubmenu}
      isSelected={isSelected}
      isAccordion={isAccordion}
      disableRipple={isAccordion}
      onClick={() => { !isAccordion && handleTabChange(menu.path)}}
    >
      {!isSubmenu && (
        <DrawerMenuButtonIcon isSelected={isSelected}>{menu.icon}</DrawerMenuButtonIcon>
      )}
      <DrawerMenuButtonText primary={menu.name} isSelected={isSelected} />
    </DrawerMenuButtonRoot>
  );
};

export default DrawerMenuButton;
