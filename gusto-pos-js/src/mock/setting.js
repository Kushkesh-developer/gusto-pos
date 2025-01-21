export const outletMockResponse = [
{
  id: 1,
  outletId: '1',
  name: 'Masala Magic',
  address: 'Ground Floor, Sector 12 Market, Dwarka, New Delhi, 110075',
  postal: '110075',
  phone: 1140002000 // Corrected phone number as a number (removed leading zero)
},
{
  id: 2,
  outletId: '2',
  name: 'Spice Symphony',
  address: 'Shop No. 15, Linking Road, Bandra West, Mumbai, Maharashtra 400050',
  postal: '400050',
  phone: 2230001500 // Corrected phone number as a number (removed leading zero)
},
{
  id: 3,
  outletId: '3',
  name: 'The Curry House',
  address: '8th Block, Jayanagar, Bangalore, Karnataka 560070',
  postal: '560070',
  phone: 8022003300 // Corrected phone number as a number (removed leading zero)
},
{
  id: 4,
  outletId: '4',
  name: 'Chai & Chat',
  address: 'MG Road, Near Central Mall, Pune, Maharashtra 411001',
  postal: '411001',
  phone: 2050001800 // Corrected phone number as a number (removed leading zero)
},
{
  id: 5,
  outletId: '5',
  name: 'Tandoor Treats',
  address: 'Sector 18, Noida, Uttar Pradesh 201301',
  postal: '201301',
  phone: 12066002200 // Corrected phone number as a number (removed leading zero)
}
// Add more mock data as needed
];

export const paymentMockResponse = [
{
  id: 1, // Added simple id
  paymentType: 'Credit / Debit Cards',
  provider: 'Bank',
  credit_debit: true
},
{
  id: 2, // Added simple id
  paymentType: 'Paypal',
  provider: 'PayPal',
  payStatus: false
},
{
  id: 3,
  paymentType: 'Alipay',
  provider: 'Alipay',
  status1: true
},
{
  id: 4,
  paymentType: 'PayU',
  provider: 'PayU',
  payU: true
}
// Add more mock data as needed
];
export const currencyMockResponse = [
{
  id: 1, // Added simple id
  status1: false,
  currencyName: 'Dollar',
  currency: 'USD',
  symbol: '$' // Dollar icon
},
{
  id: 2, // Added simple id
  status1: false,
  currencyName: 'Euro',
  currency: 'EUR',
  symbol: '€' // Euro symbol
},
{
  id: 3, // Added simple id
  status1: true,
  currencyName: 'Pound',
  currency: 'GBP',
  symbol: '£' // Pound symbol
},
{
  id: 4, // Added simple id
  status1: true,
  currencyName: 'Rupees',
  currency: 'INR',
  symbol: '₹' // Rupee symbol
}];


export const printerMock = [
{
  id: 1, // Added simple id
  printerName: 'Bar',
  type: 'Kitchen',
  outlet: 'Chai Chee',
  printerIp: '192.168.1.10', // Added printer IP address
  printerModel: 'X123' // Added printer model
},
{
  id: 2, // Added simple id
  printerName: 'Counter A',
  type: 'Cashier',
  outlet: 'Chai Chee',
  printerIp: '192.168.1.11', // Added printer IP address
  printerModel: 'Y456' // Added printer model
},
{
  id: 3,
  printerName: 'Back Kitchen',
  type: 'Kitchen',
  outlet: 'Tampines',
  printerIp: '192.168.1.12',
  printerModel: 'Z789' // Added printer model
},
{
  id: 4,
  printerName: 'Counter B',
  type: 'Cashier',
  outlet: 'Tampines',
  printerIp: '192.168.1.13',
  printerModel: 'A234' // Added printer model
},
{
  id: 5,
  printerName: 'Bar 2',
  type: 'Kitchen',
  outlet: 'Bugis',
  printerIp: '192.168.1.14',
  printerModel: 'B567' // Added printer model
}];


export const receiptMockData = [
{
  id: 1, // Added simple id
  receiptName: 'Cashier receipt'
},
{
  id: 2, // Added simple id
  receiptName: 'Kitchen receipt'
}
// Add more mock data as needed
];
export const tablesmockResponse = [
{
  id: 1, // Added simple id
  tableName: 'Table 1',
  seat: 4,
  floor: 'Ground',
  status: 'Available'
},
{
  id: 2, // Added simple id
  tableName: 'Table 2',
  seat: 2,
  floor: 'First',
  status: 'Reserved'
},
{
  id: 3, // Added simple id
  tableName: 'Table 3',
  seat: 6,
  floor: 'Ground',
  status: 'Occupied'
},
{
  id: 4, // Added simple id
  tableName: 'Table 4',
  seat: 2,
  floor: 'Second',
  status: 'Available'
},
{
  id: 5, // Added simple id
  tableName: 'Table 5',
  seat: 4,
  floor: 'Ground',
  status: 'Occupied'
},
{
  id: 6, // Added simple id
  tableName: 'Table 6',
  seat: 8,
  floor: 'First',
  status: 'Reserved'
},
{
  id: 7, // Added simple id
  tableName: 'Table 7',
  seat: 3,
  floor: 'Second',
  status: 'Available'
},
{
  id: 8, // Added simple id
  tableName: 'Table 8',
  seat: 5,
  floor: 'Ground',
  status: 'Occupied'
},
{
  id: 9, // Added simple id
  tableName: 'Table 9',
  seat: 2,
  floor: 'First',
  status: 'Reserved'
},
{
  id: 10, // Added simple id
  tableName: 'Table 10',
  seat: 6,
  floor: 'Second',
  status: 'Available'
}];


export const taxRate = [
{ label: '7%', value: '7%' },
{ label: '10%', value: '10%' }];

export const taxName = [
{ label: 'GST', value: 'gst' },
{ label: 'VAT', value: 'vat' }];

export const terminalName = [
{ label: 'Owner', value: 'owner' },
{ label: 'Cashier', value: 'cashier' }];


export const taxesMockResponse = [
{
  id: 1, // Added simple id
  taxName: 'GST',
  taxRate: '7%',
  'on/off': false
},
{
  id: 2, // Added simple id
  taxName: 'Service Charge',
  taxRate: '10%',
  'on/off': false
}
// Add more mock data as needed
];

export const terminalMock = [
{
  id: 1, // Added simple id
  terminalId: '1',
  terminalName: 'Owner',
  outlets: 'Chai Chee',
  status: 'Activated'
},
{
  id: 2, // Added simple id
  terminalId: '2',
  terminalName: 'Cashier',
  outlets: 'Chai Chee',
  status: 'Not activated'
}
// Add more mock data as needed
];
export const floorsMockResponse = [
{ value: 'ground', label: 'Ground Floor' },
{ value: 'first', label: 'First Floor' },
{ value: 'second', label: 'Second Floor' }];

export const GenderData = [
{ value: 'Male', label: 'Male' },
{ value: 'Female', label: 'Female' },
{ value: 'Other', label: 'Other' }];


export const RoleData = [
{ value: 'owner', label: 'Owner' },
{ value: 'cashier', label: 'Cashier' },
{ value: 'manager', label: 'Manager' }];


export const MaritalStatusOptions = [
{ value: 'Single', label: 'Single' },
{ value: 'Married', label: 'Married' }];