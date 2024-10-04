import React from "react";
import { styled } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { DrawerMenuButtonProps } from "@/types/drawer-types";
import { getButtonStyles } from "@/utils/drawerUtils";
import { useDrawerContext } from "@/context/DrawerProvider";

/**
 * Themed components created so you can configure them via createTheme().
 * use the name mentioned in the styled object
 /** */
const DrawerMenuButtonRoot = styled(ListItemButton, {
  shouldForwardProp: (prop: string) =>
    !["is_submenu", "is_selected", "is_accordion"].includes(prop),
  name: "MuiDrawerMenuButton",
  slot: "root",
})<{
  is_submenu: boolean;
  is_selected: boolean;
  is_accordion: boolean;
}>(({ theme, is_submenu, is_selected, is_accordion }) => {
  const style = getButtonStyles(theme, is_selected, is_accordion);

  return {
    paddingLeft: is_submenu ? theme.spacing(2) : theme.spacing(2),
    height: 44,
    marginLeft: is_submenu ? theme.spacing(6) : theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: style.backgroundColor,
    color: style.color,
    borderRadius: theme.shape.borderRadius,
    boxShadow: is_selected ? theme.shadows[1] : "none",
    marginTop: 1,
    "&:hover": {
      backgroundColor: style.hoverBackground,
    },
  };
});

const DrawerMenuButtonIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop: string) =>
    !["is_submenu", "is_selected", "is_accordion"].includes(prop),
  name: "MuiDrawerMenuButton",
  slot: "icon",
})<{ is_selected: boolean }>(({ theme, is_selected }) => {
  const style = getButtonStyles(theme, is_selected);

  return {
    color: style.color,
    minWidth: 40,
  };
});

const DrawerMenuButtonText = styled(ListItemText, {
  shouldForwardProp: (prop: string) =>
    !["is_submenu", "is_selected", "is_accordion"].includes(prop),
  name: "MuiDrawerMenuButton",
  slot: "text",
})<{ is_selected: boolean }>(({ theme, is_selected }) => {
  const style = getButtonStyles(theme, is_selected);

  return {
    ".MuiTypography-root": {
      fontSize: 14,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: style.color,
    },
  };
});

const DrawerMenuButton = ({
  menu,
  isSelected,
  isAccordion = false,
  isSubmenu = false,
}: DrawerMenuButtonProps) => {
  const { handleTabChange } = useDrawerContext();

  return (
    <DrawerMenuButtonRoot
      is_submenu={isSubmenu}
      is_selected={isSelected}
      is_accordion={isAccordion}
      disableRipple={isAccordion}
      onClick={() => {
        if (!isAccordion) {
          handleTabChange(menu.path);
        }
      }}
    >
      {!isSubmenu && (
        <DrawerMenuButtonIcon is_selected={isSelected}>
          {menu.icon}
        </DrawerMenuButtonIcon>
      )}
      <DrawerMenuButtonText primary={menu.name} is_selected={isSelected} />
    </DrawerMenuButtonRoot>
  );
};

export default DrawerMenuButton;
