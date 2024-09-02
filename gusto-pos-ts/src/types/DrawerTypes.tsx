import { SvgIconComponent } from "@mui/icons-material";

export interface GSDrawerProps {
  drawerWidth: number;
}

export interface MenuItem {
  name: string;
  path: string;
  icon?: React.ReactElement<SvgIconComponent>;
  subMenus?: MenuItem[];
}

export interface DrawerMenuListProps {
  selectedTab: string;
  onSelectMenu: (path: string) => void;
}

export interface DrawerMenuItemProps {
  menu: MenuItem;
  selectedTab: string;
  onSelectMenu: (path: string) => void;
}

export interface DrawerMenuButtonProps {
  menu: MenuItem;
  isSelected: boolean;
  onSelectMenu: (path: string) => void;
  isAccordion?: boolean;
  isSubmenu?: boolean;
}
