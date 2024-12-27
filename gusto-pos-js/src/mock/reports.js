export const itemMock = [
{
  id: 1,
  itemName: 'Wheat Flour',
  outlet: 'Downtown',
  qty: '100',
  unit: 'kg',
  minQty: '1',
  maxQty: '100',
  itemType: 'Raw Material'
},
{
  id: 2,
  itemName: 'Lettuce',
  outlet: 'Downtown',
  qty: '50',
  unit: 'kg',
  minQty: '1',
  maxQty: '100',
  itemType: 'Raw Material'
},
{
  id: 3,
  itemName: 'Tomato Slices',
  outlet: 'Chai Chee',
  qty: '30',
  unit: 'kg',
  minQty: '1',
  maxQty: '100',
  itemType: 'Raw Material'
},
{
  id: 4,
  itemName: 'Cheddar Cheese',
  outlet: 'Chai Chee',
  qty: '20',
  unit: 'kg',
  minQty: '1',
  maxQty: '50',
  itemType: 'Raw Material'
},
{
  id: 5,
  itemName: 'Ketchup',
  outlet: 'Chai Chee',
  qty: '10',
  unit: 'liters',
  minQty: '1',
  maxQty: '20',
  itemType: 'Raw Material'
},
{
  id: 6,
  itemName: 'Onion Rings',
  outlet: 'Chai Chee',
  qty: '15',
  unit: 'kg',
  minQty: '1',
  maxQty: '30',
  itemType: 'Raw Material'
}];


export const revenueMock = [
{
  id: 1,
  date: '17/09/2024',
  outlet: 'Velvet Basil',
  sale: '$28000',
  tax: '$100',
  discAmount: '$10.6',
  cost: '$400',
  netProfit: '$2800'
},
{
  id: 2,
  date: '18/09/2024',
  outlet: 'Velvet Basil',
  sale: '$30000',
  tax: '$150',
  discAmount: '$15',
  cost: '$450',
  netProfit: '$3000'
},
{
  id: 3,
  date: '19/09/2024',
  outlet: 'CraveLyne Bistro',
  sale: '$25000',
  tax: '$80',
  discAmount: '$8',
  cost: '$350',
  netProfit: '$2500'
},
{
  id: 4,
  date: '20/09/2024',
  outlet: 'CraveLyne Bistro',
  sale: '$29000',
  tax: '$120',
  discAmount: '$12',
  cost: '$420',
  netProfit: '$2900'
},
{
  id: 5,
  date: '21/09/2024',
  outlet: 'Chai Chee',
  sale: '$31000',
  tax: '$180',
  discAmount: '$20',
  cost: '$500',
  netProfit: '$3100'
},
{
  id: 6,
  date: '22/09/2024',
  outlet: 'Chai Chee',
  sale: '$32000',
  tax: '$200',
  discAmount: '$25',
  cost: '$520',
  netProfit: '$3200'
}];


export const timeMock = [
{
  id: 1,
  staffName: 'XYZ',
  role: 'Warehouse Manager',
  outlet: 'CraveLyne Bistro',
  clockIn: '8:00',
  clockOut: '17:00',
  totalTime: '8 hr',
  totalRevenue: '$200'
},
{
  id: 2,
  staffName: 'Amit M Agarwal',
  role: 'Warehouse Manager',
  outlet: 'CraveLyne Bistro',
  clockIn: '8:00',
  clockOut: '17:00',
  totalTime: '8 hr',
  totalRevenue: '$200'
},
{
  id: 3,
  staffName: 'Sara L',
  role: 'Cook',
  outlet: 'CraveLyne Bistro',
  clockIn: '9:00',
  clockOut: '18:00',
  totalTime: '8 hr',
  totalRevenue: '$250'
},
{
  id: 4,
  staffName: 'John D',
  role: 'Server',
  outlet: 'CraveLyne Bistro',
  clockIn: '10:00',
  clockOut: '19:00',
  totalTime: '8 hr',
  totalRevenue: '$180'
},
{
  id: 5,
  staffName: 'Emily T',
  role: 'Cleaner',
  outlet: 'CraveLyne Bistro',
  clockIn: '7:00',
  clockOut: '15:00',
  totalTime: '8 hr',
  totalRevenue: '$150'
},
{
  id: 6,
  staffName: 'Michael R',
  role: 'Cashier',
  outlet: 'CraveLyne Bistro',
  clockIn: '8:30',
  clockOut: '17:30',
  totalTime: '9 hr',
  totalRevenue: '$220'
}];


export const areaOrderMock = [
{
  id: 1,
  no: '1',
  location: 'Praygraj',
  frequency: 'x28',
  outlet: 'Bacca Bucci',
  totalSpending: '$400',
  type: 'Delivery'
},
{
  id: 2,
  no: '2',
  location: 'Indore',
  frequency: 'x28',
  outlet: 'Bacca Bucci',
  totalSpending: '$400',
  type: 'Delivery'
},
{
  id: 3,
  no: '3',
  location: 'Mumbai',
  frequency: 'x15',
  outlet: 'Bacca Bucci',
  totalSpending: '$600',
  type: 'Pickup'
},
{
  id: 4,
  no: '4',
  location: 'Delhi',
  frequency: 'x10',
  outlet: 'Bacca Bucci',
  totalSpending: '$800',
  type: 'Delivery'
},
{
  id: 5,
  no: '5',
  location: 'Bangalore',
  frequency: 'x12',
  outlet: 'Bacca Bucci',
  totalSpending: '$500',
  type: 'Pickup'
},
{
  id: 6,
  no: '6',
  location: 'Chennai',
  frequency: 'x20',
  outlet: 'Bacca Bucci',
  totalSpending: '$750',
  type: 'Delivery'
}];

export const selectFrom = [
{ label: 'All', value: 'all' },
{ label: 'Velvet Basil', value: 'velvetBasil' },
{ label: 'Chai Chee', value: 'chaiChee' }];

export const filterByName = [
{ label: 'Amit M Agarwal', value: 'amitMAgarwal' },
{ label: 'Michael R', value: 'michaelR' }];

export const filterByRole = [
{ label: 'Warehouse Manager', value: 'warehouseManager' },
{ label: 'Server', value: 'server' }];


export const selectItem = [
{ label: 'Wheat Flour', value: 'wheatFlour' },
{ label: 'Lettuce', value: 'lettuce' },
{ label: 'Tomato Slices', value: 'tomatoSlices' },
{ label: 'Cheddar Cheese', value: 'cheddarCheese' },
{ label: 'Ketchup', value: 'ketchup' },
{ label: 'Onion Rings', value: 'onionRings' },
{ label: 'Chicken', value: 'chicken' }];

export const topProductMockData = [
{
  id: 1,
  itemName: 'Apple',
  category: 'Fruits',
  outlet: 'SuperMart',
  qty: 50,
  sale: 150
},
{
  id: 2,
  itemName: 'Banana',
  category: 'Fruits',
  outlet: 'Fresh Foods',
  qty: 30,
  sale: 90
},
{
  id: 3,
  itemName: 'Carrot',
  category: 'Vegetables',
  outlet: 'Veggie Market',
  qty: 70,
  sale: 210
},
{
  id: 4,
  itemName: 'Detergent',
  category: 'Cleaning Supplies',
  outlet: 'Household Store',
  qty: 20,
  sale: 200
},
{
  id: 5,
  itemName: 'Milk',
  category: 'Dairy',
  outlet: 'SuperMart',
  qty: 40,
  sale: 120
},
{
  id: 6,
  itemName: 'Bread',
  category: 'Bakery',
  outlet: 'Fresh Foods',
  qty: 60,
  sale: 180
}];