import { ProductExpiry } from "@/components/dashboard/ProductExpiry";
import { ProductStock } from "@/components/dashboard/ProductStock";
import { SalesBreakdownsReportType } from "@/components/dashboard/SalesReportBreakdown";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import { IconProps } from "@/components/dashboard/StatisticsCard";

// Daily labels for "This Week" range
export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Date labels for "This Month" range (assuming up to 31 days)
export const datesOfMonth = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString(),
);

export const statisticsData = [
  {
    id: 1,
    title: "Total Sell",
    value: "$2200.00",
    icon: (props: IconProps) => <AutoGraphIcon {...props} />,
  },
  {
    id: 3,
    title: "Expenses",
    value: "$1000.00",
    icon: (props: IconProps) => <EqualizerIcon {...props} />,
  },
  {
    id: 4,
    title: "Profit",
    value: "$1200.00",
    isPositive: true,
    icon: (props: IconProps) => <CurrencyRupeeIcon {...props} />,
  },
  {
    id: 5,
    title: "Online Sale",
    value: "$1000.00",
    icon: (props: IconProps) => <ImportantDevicesIcon {...props} />,
  },
];

export const hours: string[] = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];

export const stalesBreakDownReportData: SalesBreakdownsReportType[] = [
  {
    //define these "undefined" values if requires
    title: undefined,
    saleTitleHeading: undefined,
    amountHeading: undefined,
    items: [
      { title: "Total Sales", price: "380.80" },
      { title: "Credit", price: "0.00" },
      { title: "Total Sales Before Tax", price: "354.15" },
      { title: "GST 7% (incl)", price: "26.65" },
      { title: "Discount Total", price: "0.00" },
      { title: "Rounding", price: "0.00" },
      { title: "Refund Amount", price: "0.00" },
    ],
  },
  {
    title: undefined,
    saleTitleHeading: undefined,
    amountHeading: undefined,
    items: [
      { title: "Cash Sales", price: "250.30" },
      { title: "CASH IN DRAWER", price: "44.70" },
      { title: "Void Amount", price: "0.00" },
      { title: "Item Void", price: "0" },
      { title: "Start Receipt", price: "0.00" },
      { title: "End Receipt", price: "0.00" },
      { title: "No. of Receipt", price: "0.00" },
      { title: "Average Per Receipt", price: "0.00" },
    ],
  },
  {
    title: "**PAYMENT BREAKDOWN",
    saleTitleHeading: "Category",
    amountHeading: "Amount($)",
    items: [
      { title: "Burgers", price: "380.80" },
      { title: "Sides", price: "57.00" },
    ],
  },
  {
    title: "**PAYMENT BREAKDOWN",
    saleTitleHeading: "Product",
    amountHeading: "Total($)",
    quantityHeading: "Qty",
    items: [
      { title: "Cheese Burger", quantity: "18", price: "108.00" },
      { title: "Bacon Cheese Burger", quantity: "12", price: "92.40" },
      { title: "Beef Brisket Burger", quantity: "10", price: "70.00" },
      { title: "Crispy Rendang Burger", quantity: "8", price: "50.10" },
      { title: "Takeaway $0.30", quantity: "6", price: "3.30" },
      { title: "Free Takeaway", quantity: "1", price: "0.00" },
    ],
  },
];

export const productStockData: ProductStock[] = [
  {
    id: 1,
    product: "Chicken",
    location: "Chai Chee",
    quantity: "5",
  },
  {
    id: 2,
    product: "Breads",
    location: "Chai Chee",
    quantity: "10",
  },
  {
    id: 3,
    product: "Sous",
    location: "Chai Chee",
    quantity: "15",
  },
  {
    id: 4,
    product: "Chicken",
    location: "Chai Chee",
    quantity: "5",
  },
  {
    id: 5,
    product: "Breads",
    location: "Chai Chee",
    quantity: "10",
  },
  {
    id: 6,
    product: "Sous",
    location: "Chai Chee",
    quantity: "15",
  },
];

export const productExpiryData: ProductExpiry[] = [
  {
    id: 1,
    product: "Chicken",
    location: "Chai Chee Market",
    expiry: "12/2/20",
    quantity: "5",
  },
  {
    id: 2,
    product: "Breads",
    location: "Chai Chee Bakery",
    expiry: "12/2/20",
    quantity: "10",
  },
  {
    id: 3,
    product: "Fish",
    location: "Chai Chee Seafood Market",
    expiry: "12/5/20",
    quantity: "8",
  },
  {
    id: 4,
    product: "Cheese",
    location: "Chai Chee Dairy Shop",
    expiry: "12/10/20",
    quantity: "6",
  },
  {
    id: 5,
    product: "Milk",
    location: "Chai Chee Grocery Store",
    expiry: "12/15/20",
    quantity: "12",
  },
];

// const floorOptions = [
//   { label: "One", value: "One" },
//   { label: "Two", value: "Two" },
// ];

// const outletsOptions = [
//   { label: "Outlet 1", value: "outlet1" },
//   { label: "Outlet 2", value: "outlet2" },
// ];
