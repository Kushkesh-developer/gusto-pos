import React from "react";
import { List } from "@mui/material";
import DrawerMenuItem from "./DrawerMenuItem";
import { DrawerMenuListProps } from "@/types/DrawerTypes";
import NavigationMenu from "@/constants/navigation";

const DrawerMenuList = ({ selectedTab, onSelectMenu }: DrawerMenuListProps) => {
  const navigationMenu = NavigationMenu();
  return (
    <List>
      {navigationMenu.map((menu) => (
        <DrawerMenuItem
          key={menu.name}
          menu={menu}
          selectedTab={selectedTab}
          onSelectMenu={onSelectMenu}
        />
      ))}
    </List>
  );
};

export default DrawerMenuList;
