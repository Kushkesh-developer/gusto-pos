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
<<<<<<< Updated upstream
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <SpaceDashboard />,
        subMenus:[]
    },
    {
        name: "Staff",
        path: "/staff",
        icon: <Staff/>,
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
                name: "Roles",
                path: "/staff/roles",
            }
        ]
    },
    {
        name: "Customers",
        path: "/customers",
        icon: <Group />,
        subMenus:[ {
            name: "View Customer",
            path: "/customers/view-customer",
        },]
    },
=======
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
        path: "/staff/viewStaff",
      },
      {
        name: "Users",
        path: "/staff/users",
      },
      {
        name: "Roles",
        path: "/staff/roles",
      },
    ],
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <Group />,
    subMenus: [],
  },
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
        name: "Users",
        path: "/staff/users",
      },
      {
        name: "Roles",
        path: "/staff/roles",
      },
    ],
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <Group />,
    subMenus: [
      {
        name: "AddCustomer",
        path: "/add-customers",
      },
    ],
  },
>>>>>>> Stashed changes
];

export default navigationMenu;
