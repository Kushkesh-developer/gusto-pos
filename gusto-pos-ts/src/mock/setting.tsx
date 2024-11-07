import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";

export const outletMockResponse = [
  {
    id: 1, // Added simple id
    outletId: "1",
    name: "Chai Chee",
    address: "#01-19 Viva Business Park, 750 Chai Chee Rd, Singapore 469000",
    postal: "469000",
    phone: "6920 2093",
  },
  {
    id: 2, // Added simple id
    outletId: "2",
    name: "Chai Chee",
    address: "#01-19 Viva Business Park, 750 Chai Chee Rd, Singapore 469000",
    postal: "469000",
    phone: "6920 2093",
  },
  // Add more mock data as needed
];

export const paymentMockResponse = [
  {
    id: 1, // Added simple id
    paymentType: "Credit / Debit Cards",
    provider: "Stripe",
    "status1": false
  },
  {
    id: 2, // Added simple id
    paymentType: "Paypal",
    provider: "Stripe",
    "status1": false
  },
  // Add more mock data as needed
];

export const printerMock = [
  {
    id: 1, // Added simple id
    printerName: "Bar",
    type: "Kitchen",
    outlet: "Chai Chee",
    category: "Drinks",
  },
  {
    id: 2, // Added simple id
    printerName: "Counter A",
    type: "Cashier",
    outlet: "Chai Chee",
    category: "-",
  },
  // Add more mock data as needed
];

export const receiptMockData = [
  {
    id: 1, // Added simple id
    receiptName: "Cashier receipt",
  },
  {
    id: 2, // Added simple id
    receiptName: "Kitchen receipt",
  },
  // Add more mock data as needed
];

export const tablesmockResponse = [
  {
    id: 1, // Added simple id
    terminalId: "1",
    terminalName: "Owner",
    outlets: "Chai Chee",
    status: "Activated",
  },
  {
    id: 2, // Added simple id
    terminalId: "2",
    terminalName: "Cashier",
    outlets: "Chai Chee",
    status: "Not activated",
  },
  // Add more mock data as needed
];

export const floorOptions = [
  { label: "One", value: "One" },
  { label: "Two", value: "Two" },
];

export const outletsOptions = [
  { label: "Outlet 1", value: "outlet1" },
  { label: "Outlet 2", value: "outlet2" },
];

export const taxesMockResponse = [
  {
    id: 1, // Added simple id
    name: "GST",
    taxRate: "7%",
    "on/off": false
  },
  {
    id: 2, // Added simple id
    name: "Service Charge",
    taxRate: "10%",
    "on/off": false
  },
  // Add more mock data as needed
];

export const terminalMock = [
  {
    id: 1, // Added simple id
    terminalId: "1",
    terminalName: "Owner",
    outlets: "Chai Chee",
    status: "Activated",
  },
  {
    id: 2, // Added simple id
    terminalId: "2",
    terminalName: "Cashier",
    outlets: "Chai Chee",
    status: "Not activated",
  },
  // Add more mock data as needed
];
