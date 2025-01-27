export const categoryMock = [
{
  id: 1,
  itemName: 'fashion',
  order: '1',
  logoImage: '/images/fashion.jpg',
  image: '/images/fashion.jpg',
  createdDate: '24-Mar-2020',
  showOnWeb: true, // Boolean values
  showOnPos: false
},
{
  id: 2,
  itemName: 'Home',
  order: '2',
  logoImage: '/images/Home.jpg',
  image: '/images/Home.jpg',
  createdDate: '22-Mar-2020',
  showOnWeb: false,
  showOnPos: true
},
{
  id: 3,
  itemName: 'Electronics',
  order: '2',
  logoImage: '/images/electronics.jpg',
  image: '/images/electronics.jpg',
  createdDate: '22-Mar-2020',
  showOnWeb: false,
  showOnPos: true
},
{
  id: 4,
  itemName: 'Food',
  order: '4',
  logoImage: '/assets/products/burger.jpg',
  image: '/assets/products/burger.jpg',
  createdDate: '20-Mar-2020',
  showOnWeb: true,
  showOnPos: false
}];

export const timeSlots = [
{ value: '08:00 - 08:30', label: '08:00 - 08:30' },
{ value: '08:30 - 09:00', label: '08:30 - 09:00' },
{ value: '09:00 - 09:30', label: '09:00 - 09:30' },
{ value: '09:30 - 10:00', label: '09:30 - 10:00' },
{ value: '10:00 - 10:30', label: '10:00 - 10:30' },
{ value: '10:30 - 11:00', label: '10:30 - 11:00' },
{ value: '11:00 - 11:30', label: '11:00 - 11:30' },
{ value: '11:30 - 12:00', label: '11:30 - 12:00' },
{ value: '12:00 - 12:30', label: '12:00 - 12:30' },
{ value: '12:30 - 01:00', label: '12:30 - 01:00' },
{ value: '01:00 - 01:30', label: '01:00 - 01:30' },
{ value: '01:30 - 02:00', label: '01:30 - 02:00' },
{ value: '02:00 - 02:30', label: '02:00 - 02:30' },
{ value: '02:30 - 03:00', label: '02:30 - 03:00' },
{ value: '03:00 - 03:30', label: '03:00 - 03:30' },
{ value: '03:30 - 04:00', label: '03:30 - 04:00' },
{ value: '04:00 - 04:30', label: '04:00 - 04:30' },
{ value: '04:30 - 05:00', label: '04:30 - 05:00' },
{ value: '05:00 - 05:30', label: '05:00 - 05:30' }];

export const productsData = [
{
  id: 1,
  itemName: 'Pizza',
  unit: '1',
  createdDate: '24-Mar-2020',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 2,
  itemName: 'Burger',
  unit: '2',
  createdDate: '22-Mar-2020',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 3,
  itemName: 'Pasta',
  unit: '3',
  createdDate: '20-Mar-2020',
  showOnWeb: true,
  showOnPos: false
},
{
  id: 4,
  itemName: 'Salad',
  unit: '4',
  createdDate: '18-Mar-2020',
  showOnWeb: true,
  showOnPos: false
},
{
  id: 5,
  itemName: 'T-Shirt',
  unit: '3',
  createdDate: '18-Mar-2022',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 6,
  itemName: 'T-Shirt (Zudio)',
  unit: '1',
  createdDate: '20-Jan-2025',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 7,
  itemName: 'T-Shirt',
  unit: '2',
  createdDate: '19-Jan-2025',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 8,
  itemName: 'Chair',
  unit: '5',
  createdDate: '18-Jan-2025',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 9,
  itemName: 'Jeans',
  unit: '2',
  createdDate: '17-Jan-2025',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 10,
  itemName: 'Smartwatch',
  unit: '10',
  createdDate: '16-Jan-2025',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 11,
  itemName: 'Desk',
  unit: '3',
  createdDate: '15-Jan-2025',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 12,
  itemName: 'Lamp',
  unit: '7',
  createdDate: '14-Jan-2025',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 13,
  itemName: 'Laptop',
  unit: '4',
  createdDate: '13-Jan-2025',
  showOnWeb: true,
  showOnPos: true
},
{
  id: 14,
  itemName: 'Headphones',
  unit: '8',
  createdDate: '12-Jan-2025',
  showOnWeb: true,
  showOnPos: true
}];












export const quickDiscountMock = {
  Burger: [
  {
    name: 'Cheeseburger',
    price: 10,
    specialPrice1: 9,
    specialPrice2: 8,
    specialPrice3: 7,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30
  },
  {
    name: 'Bacon Burger',
    price: 12,
    specialPrice1: 11,
    specialPrice2: 10,
    specialPrice3: 9,
    minQty1: 15,
    minQty2: 25,
    minQty3: 35
  },
  {
    name: 'Veggie Burger',
    price: 9,
    specialPrice1: 8,
    specialPrice2: 7,
    specialPrice3: 6,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30
  }],

  Pizza: [
  {
    name: 'Margherita',
    price: 14,
    specialPrice1: 13,
    specialPrice2: 12,
    specialPrice3: 11,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30
  },
  {
    name: 'Pepperoni',
    price: 16,
    specialPrice1: 15,
    specialPrice2: 14,
    specialPrice3: 13,
    minQty1: 15,
    minQty2: 25,
    minQty3: 35
  },
  {
    name: 'BBQ Chicken',
    price: 18,
    specialPrice1: 17,
    specialPrice2: 16,
    specialPrice3: 15,
    minQty1: 12,
    minQty2: 24,
    minQty3: 36
  }],

  Pasta: [
  {
    name: 'Spaghetti Bolognese',
    price: 13,
    specialPrice1: 12,
    specialPrice2: 11,
    specialPrice3: 10,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30
  },
  {
    name: 'Fettuccine Alfredo',
    price: 14,
    specialPrice1: 13,
    specialPrice2: 12,
    specialPrice3: 11,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30
  }],

  Salad: [
  {
    name: 'Caesar Salad',
    price: 8,
    specialPrice1: 7,
    specialPrice2: 6,
    specialPrice3: 5,
    minQty1: 5,
    minQty2: 10,
    minQty3: 15
  },
  {
    name: 'Greek Salad',
    price: 9,
    specialPrice1: 8,
    specialPrice2: 7,
    specialPrice3: 6,
    minQty1: 8,
    minQty2: 16,
    minQty3: 24
  }]

};
export const GSTCategoryData = [
{ value: 'category1', label: 'GST' },
{ value: 'category2', label: 'VAT' }];

export const CategoryOrder = [
{ value: 'salad', label: 'Salad' },
{ value: 'burger', label: 'Burger' },
{ value: 'pizza', label: 'Pizza' }];

export const selectPriceUpdate = [
{ value: 'Burger', label: 'Burger' },
{ value: 'Pizza', label: 'Pizza' },
{ value: 'Pasta', label: 'Pasta' },
{ value: 'Salad', label: 'Salad' }];

export const selectPriceUpdate2 = [
{ value: 'Burger', label: 'Burger' },
{ value: 'Pizza', label: 'Pizza' },
{ value: 'Pasta', label: 'Pasta' },
{ value: 'Salad', label: 'Salad' }];

export const selectPriceUpdate0 = [
{ value: 'Burger', label: 'Burger' },
{ value: 'Pizza', label: 'Pizza' },
{ value: 'Pasta', label: 'Pasta' },
{ value: 'Salad', label: 'Salad' }];