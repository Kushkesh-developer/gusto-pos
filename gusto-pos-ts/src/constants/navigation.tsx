import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import Staff from "@mui/icons-material/Badge";
import Group from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
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
      // { name: "Add Customer Group", path: "/customers/add-customer-group" },
    ],
  },
  {
    name: "Suppliers",
    path: "/suppliers",
    icon: <InventoryIcon />,
    subMenus: [
      {
        name: "View Suppliers",
        path: "/suppliers/view-suppliers",
      },
      {
        name: "Add Suppliers",
        path: "/suppliers/add-suppliers",
      },
    ],
  },
  {
    name: "Product",
    path: "/products",
    icon: <ProductionQuantityLimitsIcon />,
    subMenus: [
      {
        name: "View Product",
        path: "/products/view-products",
      },
      {
        name: "Add Product Item",
        path: "/products/add-product-items",
      },
      {
        name: "View Category",
        path: "/products/view-category",
      },
      {
        name: "Add Category",
        path: "/products/add-category",
      },
      {
        name: "Quick Price Update",
        path: "/products/quick-price-update",
      },
      {
        name: "Quick Discount Update",
        path: "/products/add-discount-items",
      },
      {
        name: "Quick Image Update",
        path: "/products/add-image-items",
      },
    ],
  },
];

export default navigationMenu;
