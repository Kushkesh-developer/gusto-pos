import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';

export interface DrawerMenuProps {
  drawerWidth: number;
}
export interface MenuSection {
  sectionLabel: string;
  menuItems: MenuItem[];
}
export interface MenuItem {
  name: string;
  path: string;
  icon?: React.ReactElement<SvgIconComponent>;
  subMenus?: MenuItem[];
}

export interface DrawerMenuItemProps {
  menu: MenuItem;
}

export interface DrawerMenuButtonProps {
  menu: MenuItem;
  isSelected: boolean;
  isAccordion?: boolean;
  isSubmenu?: boolean;
}
