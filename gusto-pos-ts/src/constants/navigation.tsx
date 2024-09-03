import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import Staff from "@mui/icons-material/Badge";
import Group from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { MenuItem } from "@/types/DrawerTypes";
import { useLocalization } from "@/context/LocalizationProvider";

const NavigationMenu = () => {
  const { translate } = useLocalization();
  const navigationMenu: MenuItem[] = [
    {
      name: translate("dashboard"),
      path: "/dashboard",
      icon: <SpaceDashboard />,
      subMenus: [],
    },
    {
      name: translate("staff"),
      path: "/staff",
      icon: <Staff />,
      subMenus: [
        {
          name: translate("view_staff"),
          path: "/staff/view-staff",
        },
        {
          name: translate("add_staff"),
          path: "/staff/add-staff",
        },
        {
          name: translate("roles_and_permission"),
          path: "/staff/roles-and-permission",
        },
        {
          name: translate("add_roles_And_permission"),
          path: "/staff/add-roles-and-permission",
        },
      ],
    },
    {
      name: translate("customer"),
      path: "/customers",
      icon: <Group />,
      subMenus: [
        {
          name: translate("view_customer"),
          path: "/customers/view-customer",
        },
        {
          name: translate("add_customer"),
          path: "/customers/add-customers",
        },
        {
          name: translate("view_customer_group"),
          path: "/customers/view-customer-group",
        },
        {
          name: translate("add_customer_group"),
          path: "/customers/add-customer-group",
        },
      ],
    },
    {
      name: translate("supplier"),
      path: "/suppliers",
      icon: <InventoryIcon />,
      subMenus: [
        {
          name: translate("view_supplier"),
          path: "/suppliers/view-suppliers",
        },
        {
          name: translate("add_supplier"),
          path: "/suppliers/add-suppliers",
        },
      ],
    },
    {
      name: translate("product"),
      path: "/products",
      icon: <ProductionQuantityLimitsIcon />,
      subMenus: [
        {
          name: translate("view_product"),
          path: "/products/view-products",
        },
        {
          name: translate("add_product_item"),
          path: "/products/add-product-items",
        },
        {
          name: translate("view_category"),
          path: "/products/view-category",
        },
        {
          name: translate("add_category"),
          path: "/products/add-category",
        },
        {
          name: translate("quick_price_update"),
          path: "/products/quick-price-update",
        },
        {
          name: translate("quick_discount_update"),
          path: "/products/quick-discount-update",
        },
        {
          name: translate("quick_image_update"),
          path: "/products/quick-image-update",
        },
      ],
    },
  ];

  return navigationMenu;
};

export default NavigationMenu;
