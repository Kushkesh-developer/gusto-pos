import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import Staff from "@mui/icons-material/Badge";
import Group from "@mui/icons-material/Group";

interface NavigationType {
  name: string;
  path: string;
  icon?: React.ReactNode;
  subMenus?: {
    name: string;
    path: string;
  }[];
}

const navigationMenu: NavigationType[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <SpaceDashboard />,
    subMenus: [],
  },
  {
    name: "Staff",
    path: "/staff",
    icon: <Staff />,
    subMenus: [
      {
        name: "View Staff",
        path: "/staff/view-staff",
      },
      {
        name: "Users",
        path: "/staff/users",
      },
      {
        name: "Roles & Permission",
        path: "/staff/roles-and-permission",
      },
      {
        name: "Add Roles & Permission",
        path: "/staff/add-roles-and-permission",
      },
    ],
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <Group />,
    subMenus: [
      {
        name: "View Customer",
        path: "/customers/view-customer",
      },
      {
        name: "View Customer Group",
        path: "/customers/view-customer-group",
      },
    ],
  },
];

export default navigationMenu;
