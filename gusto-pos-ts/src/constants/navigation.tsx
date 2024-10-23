import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import Staff from "@mui/icons-material/Badge";
import Group from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { MenuItem } from "@/types/drawer-types";
import { useLocalization } from "@/context/LocalizationProvider";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Edit, TableView } from "@mui/icons-material";
import MouseIcon from "@mui/icons-material/Mouse";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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
      name: translate("authication"),
      path: "/authication",
      icon: <AssuredWorkloadIcon />,
      subMenus: [
        {
          name: translate("login"),
          path: "/login",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("sign-up"),
          path: "/signup",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("change_password"),
          path: "/change-password",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
      ],
    },
    {
      name: translate("staff"),
      path: "/staff",
      icon: <Staff />,
      subMenus: [
        {
          name: translate("view_staff"),
          path: "/staff/view-staff",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_staff"),
          path: "/staff/add-staff",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("roles_and_permission"),
          path: "/staff/roles-and-permission",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_roles_And_permission"),
          path: "/staff/add-roles-and-permission",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
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
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_customer"),
          path: "/customers/add-customers",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("view_customer_group"),
          path: "/customers/view-customer-group",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_customer_group"),
          path: "/customers/add-customer-group",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
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
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_supplier"),
          path: "/suppliers/add-suppliers",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
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
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_product_item"),
          path: "/products/add-product-items",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("view_category"),
          path: "/products/view-category",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_category"),
          path: "/products/add-category",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("quick_price_update"),
          path: "/products/quick-price-update",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("quick_discount_update"),
          path: "/products/quick-discount-update",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("quick_image_update"),
          path: "/products/quick-image-update",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
      ],
    },
    {
      name: translate("modifiers"),
      path: "/modifier",
      icon: <Edit />,
      subMenus: [
        {
          name: translate("view_modifier"),
          path: "/modifier/view-modifier",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("view_modifier_group"),
          path: "/modifier/view-modifier-group",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
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
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("reconciliation"),
          path: "/inventory/reconciliation",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("adjustment"),
          path: "/inventory/adjustment",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("transfer"),
          path: "/inventory/transfer",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("recieve"),
          path: "/inventory/recieve",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
      ],
    },
    {
      name: translate("reports"),
      path: "/reports",
      icon: <DonutSmallIcon />,
      subMenus: [
        {
          name: translate("item_summary_reports"),
          path: "/reports/item-summary-reports",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("top_product_reports"),
          path: "/reports/top-product-reports",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("revenue_sale_report"),
          path: "/reports/revenue-sale-report",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("timesheet_report"),
          path: "/reports/timesheet-report",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("area_order_report"),
          path: "/reports/area-order-report",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
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
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate(" Add Discount"),
          path: "/discount/add-discount-options",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
      ],
    },
    {
      name: translate("delivery"),
      path: "/delivery",
      icon: <AirportShuttleIcon />,
      subMenus: [
        {
          name: translate("delivery_location"),
          path: "/delivery/delivery-location",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("view_drivers"),
          path: "/delivery/view-drivers",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_drivers"),
          path: "/delivery/add-drivers",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("delivery_cost"),
          path: "/delivery/delivery-cost",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
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
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_promotions_rules"),
          path: "/promotions/add-promotions-rules",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
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
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("rewards"),
          path: "/loyalty-program/rewards",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
      ],
    },
    {
      name: translate("settings"),
      path: "/settings",
      icon: <MouseIcon />,
      subMenus: [
        {
          name: translate("business_info"),
          path: "/settings/business-info",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("outlets"),
          path: "/settings/outlets",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("terminal"),
          path: "/settings/terminal",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("tables"),
          path: "/settings/tables",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("printer"),
          path: "/settings/printer",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("payment_types"),
          path: "/settings/payment-types",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("taxes"),
          path: "/settings/taxes",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("receipt"),
          path: "/settings/receipt",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
      ],
    },
    {
      name: translate("cds"),
      path: "/cds",
      icon: <DesktopMacIcon />,
      subMenus: [
        {
          name: translate("slider_image_settings"),
          path: "/cds/current-running-ads",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
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
        {
          name: translate("view_queue"),
          path: "/queue-management/view-queue",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("view_ads"),
          path: "/queue-management/view-ads",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
        {
          name: translate("add_slider_image"),
          path: "/queue-management/add-slider-image",
          icon: <FiberManualRecordIcon sx={{ fontSize: "14px" }} />,
        },
      ],
    },
    { name: translate("floor_plan"), path: "/floor-plan", icon: <TableView /> },
  ];

  return navigationMenu;
};

export default NavigationMenu;
