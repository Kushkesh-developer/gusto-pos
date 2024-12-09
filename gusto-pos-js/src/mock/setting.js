export const outletMockResponse = [
  {
    id: 1,
    outletId: '1',
    name: 'Masala Magic',
    address: 'Ground Floor, Sector 12 Market, Dwarka, New Delhi, 110075',
    postal: '110075',
    phone: '011 4000 2000',
  },
  {
    id: 2,
    outletId: '2',
    name: 'Spice Symphony',
    address: 'Shop No. 15, Linking Road, Bandra West, Mumbai, Maharashtra 400050',
    postal: '400050',
    phone: '022 3000 1500',
  },
  {
    id: 3,
    outletId: '3',
    name: 'The Curry House',
    address: '8th Block, Jayanagar, Bangalore, Karnataka 560070',
    postal: '560070',
    phone: '080 2200 3300',
  },
  {
    id: 4,
    outletId: '4',
    name: 'Chai & Chat',
    address: 'MG Road, Near Central Mall, Pune, Maharashtra 411001',
    postal: '411001',
    phone: '020 5000 1800',
  },
  {
    id: 5,
    outletId: '5',
    name: 'Tandoor Treats',
    address: 'Sector 18, Noida, Uttar Pradesh 201301',
    postal: '201301',
    phone: '0120 6600 2200',
  },
  // Add more mock data as needed
];

export const paymentMockResponse = [
  {
    id: 1, // Added simple id
    paymentType: 'Credit / Debit Cards',
    provider: 'Stripe',
    status1: false,
  },
  {
    id: 2, // Added simple id
    paymentType: 'Paypal',
    provider: 'Stripe',
    status1: false,
  },
  // Add more mock data as needed
];

export const printerMock = [
  {
    id: 1, // Added simple id
    printerName: 'Bar',
    type: 'Kitchen',
    outlet: 'Chai Chee',
    category: 'Drinks',
  },
  {
    id: 2, // Added simple id
    printerName: 'Counter A',
    type: 'Cashier',
    outlet: 'Chai Chee',
    category: '-',
  },
  // Add more mock data as needed
];

export const receiptMockData = [
  {
    id: 1, // Added simple id
    receiptName: 'Cashier receipt',
  },
  {
    id: 2, // Added simple id
    receiptName: 'Kitchen receipt',
  },
  // Add more mock data as needed
];

export const tablesmockResponse = [
  {
    id: 1, // Added simple id
    terminalId: '1',
    terminalName: 'Owner',
    outlets: 'Chai Chee',
    status: 'Activated',
  },
  {
    id: 2, // Added simple id
    terminalId: '2',
    terminalName: 'Cashier',
    outlets: 'Chai Chee',
    status: 'Not activated',
  },
  // Add more mock data as needed
];
export const taxRate = [
  { label: '7%', value: '7%' },
  { label: '10%', value: '10%' },
];

export const taxName = [
  { label: 'GST', value: 'gst' },
  { label: 'VAT', value: 'vat' },
];

export const terminalName = [
  { label: 'Owner', value: 'owner' },
  { label: 'Cashier', value: 'cashier' },
];

export const outletsOptions = [
  { label: 'Chai Chee', value: 'chaiChee' },
  { label: 'Downtown', value: 'Downtown' },
];

export const taxesMockResponse = [
  {
    id: 1, // Added simple id
    taxName: 'GST',
    taxRate: '7%',
    'on/off': false,
  },
  {
    id: 2, // Added simple id
    taxName: 'Service Charge',
    taxRate: '10%',
    'on/off': false,
  },
  // Add more mock data as needed
];

export const terminalMock = [
  {
    id: 1, // Added simple id
    terminalId: '1',
    terminalName: 'Owner',
    outlets: 'Chai Chee',
    status: 'Activated',
  },
  {
    id: 2, // Added simple id
    terminalId: '2',
    terminalName: 'Cashier',
    outlets: 'Chai Chee',
    status: 'Not activated',
  },
  // Add more mock data as needed
];
