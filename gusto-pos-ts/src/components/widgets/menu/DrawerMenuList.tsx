import React from "react";
import { List } from "@mui/material";
import DrawerMenuItem from "./DrawerMenuItem";
import navigationMenu from "@/constants/navigation";
import { DrawerMenuListProps } from "@/types/DrawerTypes";

const DrawerMenuList = ({ selectedTab, onSelectMenu }: DrawerMenuListProps) => {
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
