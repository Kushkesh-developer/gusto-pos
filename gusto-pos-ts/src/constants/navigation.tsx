import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import Staff from "@mui/icons-material/Badge";
import Group from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { MenuItem } from "@/types/drawer-types";
import { useLocalization } from "@/context/LocalizationProvider";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Edit } from "@mui/icons-material";
import MouseIcon from "@mui/icons-material/Mouse";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
const NavigationMenu = () => {
  const { translate } = useLocalization();

  const dashboardItems: MenuItem[] = [
    {
      name: translate("dashboard"),
      path: "/dashboard",
      icon: <SpaceDashboard />,
      subMenus: [],
    },
    {
      name: translate("reports"),
      path: "/reports",
      icon: <DonutSmallIcon />,
      subMenus: [
        {
          name: translate("item_summary_reports"),
          path: "/reports/item-summary-reports",
        },
        {
          name: translate("top_product_reports"),
          path: "/reports/top-product-reports",
        },
        {
          name: translate("revenue_sales_report"),
          path: "/reports/revenue-sale-report",
        },
        {
          name: translate("time_sheet_report"),
          path: "/reports/timesheet-report",
        },
        {
          name: translate("area_order_report"),
          path: "/reports/area-order-report",
        },
      ],
    },
  ];

  const authenticationItems: MenuItem[] = [
    {
      name: translate("authentication "),
      path: "/authentication ",
      icon: <AssuredWorkloadIcon />,
      subMenus: [
        {
          name: translate("login"),
          path: "/login",
        },
        {
          name: translate("sign_up"),
          path: "/sign-up",
        },
        {
          name: translate("change_password"),
          path: "/change-password",
        },
      ],
    },
  ];

  const operationsItems: MenuItem[] = [
    {
      name: translate("staff"),
      path: "/staff",
      icon: <Staff />,
      subMenus: [
        { name: translate("view_staff"), path: "/staff/view-staff" },
        { name: translate("add_staff"), path: "/staff/add-staff" },
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
        { name: translate("view_customer"), path: "/customers/view-customer" },
        { name: translate("add_customer"), path: "/customers/add-customers" },
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
        { name: translate("view_supplier"), path: "/suppliers/view-suppliers" },
        { name: translate("add_supplier"), path: "/suppliers/add-suppliers" },
      ],
    },
    {
      name: translate("product"),
      path: "/products",
      icon: <ProductionQuantityLimitsIcon />,
      subMenus: [
        { name: translate("view_product"), path: "/products/view-products" },
        {
          name: translate("add_product_item"),
          path: "/products/add-product-items",
        },
        { name: translate("view_category"), path: "/products/view-category" },
        { name: translate("add_category"), path: "/products/add-category" },
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
    {
      name: translate("modifiers"),
      path: "/modifier",
      icon: <Edit />,
      subMenus: [
        { name: translate("view_modifier"), path: "/modifier/view-modifier" },
        {
          name: translate("view_modifier_group"),
          path: "/modifier/view-modifier-group",
        },
      ],
    },
    {
      name: translate("inventory"),
      path: "/inventory",
      icon: <LocalShippingIcon />,
      subMenus: [
        {
          name: translate("manage_inventory"),
          path: "/inventory/manage-inventory",
        },
        {
          name: translate("reconciliation"),
          path: "/inventory/reconciliation",
        },
        { name: translate("adjustment"), path: "/inventory/adjustment" },
        { name: translate("transfer"), path: "/inventory/transfer" },
        { name: translate("recieve"), path: "/inventory/recieve" },
      ],
    },
    {
      name: translate("Discount"),
      path: "/discount",
      icon: <LocalOfferIcon />,
      subMenus: [
        {
          name: translate("Discount Options"),
          path: "/discount/discount-options",
        },
        {
          name: translate(" Add Discount"),
          path: "/discount/add-discount-options",
        },
      ],
    },

    {
      name: translate("Promotions"),
      path: "/promotions",
      icon: <LocalAtmIcon />,
      subMenus: [
        {
          name: translate("promotions_rules"),
          path: "/promotions/promotions-rules",
        },
        {
          name: translate("add_promotions_rules"),
          path: "/promotions/add-promotions-rules",
        },
      ],
    },
    {
      name: translate("loyalty_program"),
      path: "/loyalty-program",
      icon: <LoyaltyIcon />,
      subMenus: [
        {
          name: translate("loyalty_setting"),
          path: "/loyalty-program/loyalty-setting",
        },
        { name: translate("rewards"), path: "/loyalty-program/rewards" },
      ],
    },
    {
      name: translate("settings"),
      path: "/settings",
      icon: <MouseIcon />,
      subMenus: [
        { name: translate("business_info"), path: "/settings/business-info" },
        { name: translate("outlets"), path: "/settings/outlets" },
        { name: translate("terminal"), path: "/settings/terminal" },
        { name: translate("tables"), path: "/settings/tables" },
        { name: translate("printer"), path: "/settings/printer" },
        { name: translate("payment_types"), path: "/settings/payment-types" },
        { name: translate("currency_types"), path: "/settings/currency-types" },
        { name: translate("taxes"), path: "/settings/taxes" },
        { name: translate("receipt"), path: "/settings/receipt" },
      ],
    },

    {
      name: translate("sales_order"),
      path: "/sales-order",
      icon: <MonetizationOnIcon />,
    },
    {
      name: translate("queue_management"),
      path: "/queue-management",
      icon: <MouseIcon />,
      subMenus: [
        { name: translate("view_queue"), path: "/queue-management/view-queue" },
        { name: translate("view_ads"), path: "/queue-management/view-ads" },
        {
          name: translate("add_slider_image"),
          path: "/queue-management/add-slider-image",
        },
      ],
    },
  ];

  const navigationMenu: { section: string; items: MenuItem[] }[] = [
    { section: translate("dashboards"), items: dashboardItems },
    { section: translate("operations"), items: operationsItems },
    { section: translate("auth"), items: authenticationItems },
  ];

  return navigationMenu;
};

export default NavigationMenu;
