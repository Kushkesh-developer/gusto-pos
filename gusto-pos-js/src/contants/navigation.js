import SpaceDashboard from '@mui/icons-material/SpaceDashboard';
import Staff from '@mui/icons-material/Badge';
import Group from '@mui/icons-material/Group';


const navigationMenu = [
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
        subMenus:[]
    },
];

export default navigationMenu