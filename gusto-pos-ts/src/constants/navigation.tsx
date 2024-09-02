import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import Staff from "@mui/icons-material/Badge";
import Group from "@mui/icons-material/Group";
import { MenuItem } from "@/types/DrawerTypes";

const navigationMenu: MenuItem[] = [
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
        name: "Add Staff",
        path: "/staff/add-staff",
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
        name: "Add Customer",
        path: "/customers/add-customers",
      },
      {
        name: "View Customer Group",
        path: "/customers/view-customer-group",
      },
      {
        name: "Add Customer Group",
        path: "/customers/add-customer-group",
      },
    ],
  },
];

export default navigationMenu;
