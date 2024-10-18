import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
export   const OutletmockResponse = [
    {
      outletId: "1",
      name: "Chai Chee",
      address: "#01-19 Viva Business Park, 750 Chai Chee Rd, Singapore 469000",
      postal: "469000",
      phone: "6920 2093",
    },
    {
      outletId: "2",
      name: "Chai Chee",
      address: "#01-19 Viva Business Park, 750 Chai Chee Rd, Singapore 469000",
      postal: "469000",
      phone: "6920 2093",
    },
    // Add more mock data as needed
  ];

  export const PaymentmockResponse = [
    {
      paymentType: "Credit / Debit Cards	",
      provider: "Stripe",
      status: <GSSwitchButton />,
    },
    { paymentType: "Paypal", provider: "Stripe", status: <GSSwitchButton /> },
    // Add more mock data as needed
  ];

  export const printerMock = [
    {
      printerName: "Bar",
      type: "Kitchen",
      outlet: "Chai Chee",
      category: "Drinks",
    },
    {
      printerName: "Counter A",
      type: "Cashier",
      outlet: "Chai Chee",
      category: "-",
    },
    // Add more mock data as needed
  ];
   export const receiptMockdata = [
    { receiptName: "Cashier receipt" },
    { receiptName: "Kitchen receipt" },
    // Add more mock data as needed
  ];

  export   const tablesmockResponse = [
    {
      terminalId: "1",
      terminalName: "Owner",
      outlets: "Chai Chee",
      status: "Activated",
    },
    {
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
    { name: "GST", taxRate: "7%", "on/off": <GSSwitchButton /> },
    { name: "Service Charge", taxRate: "10%", "on/off": <GSSwitchButton /> },
    // Add more mock data as needed
  ];
  export  const terminalMock = [
    {
      terminalId: "1",
      terminalName: "Owner",
      outlets: "Chai Chee",
      status: "Activated",
    },
    {
      terminalId: "2",
      terminalName: "Cashier",
      outlets: "Chai Chee",
      status: "Not activated",
    },
    // Add more mock data as needed
  ];