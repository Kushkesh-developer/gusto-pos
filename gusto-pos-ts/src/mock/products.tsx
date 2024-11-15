export const categoryMock = [
  {
    id: 1,
    "Category Name": "Salad",
    Order: "1",
    image: "/assets/products/salad.jpg",
    "Created Date": "24-Mar-2020",
    "Show on Web": true, // Boolean values
    "Show on POS": false,
  },
  {
    id: 2,
    "Category Name": "Burger",
    Order: "2",
    image: "/assets/products/burger.jpg",
    "Created Date": "22-Mar-2020",
    "Show on Web": false,
    "Show on POS": true,
  },
  {
    id: 3,
    "Category Name": "Pizza",
    Order: "3",
    image: "/assets/products/pizza.jpg",
    "Created Date": "20-Mar-2020",
    "Show on Web": true,
    "Show on POS": false,
  },
];

export const productsData = [
  {
    id: 1,
    "Product Name": "Pizza",
    Order: "1",
    "Created Date": "24-Mar-2020",
    "Show on web": true,
  },
  {
    id: 2,
    "Product Name": "Burger",
    Order: "2",
    "Created Date": "22-Mar-2020",
    "Show on web": true,
  },
  {
    id: 3,
    "Product Name": "Pasta",
    Order: "3",
    "Created Date": "20-Mar-2020",
    "Show on web": true,
  },
  {
    id: 4,
    "Product Name": "Salad",
    Order: "4",
    "Created Date": "18-Mar-2020",
    "Show on web": true,
  },
];

interface ProductData {
  name: string;
  price: number;
  specialPrice1: number;
  specialPrice2: number;
  specialPrice3: number;
  minQty1: number;
  minQty2: number;
  minQty3: number;
}
export const quickDiscountMock: { [key: string]: ProductData[] } = {
  Burger: [
    {
      name: "Cheeseburger",
      price: 10,
      specialPrice1: 9,
      specialPrice2: 8,
      specialPrice3: 7,
      minQty1: 10,
      minQty2: 20,
      minQty3: 30,
    },
    {
      name: "Bacon Burger",
      price: 12,
      specialPrice1: 11,
      specialPrice2: 10,
      specialPrice3: 9,
      minQty1: 15,
      minQty2: 25,
      minQty3: 35,
    },
    {
      name: "Veggie Burger",
      price: 9,
      specialPrice1: 8,
      specialPrice2: 7,
      specialPrice3: 6,
      minQty1: 10,
      minQty2: 20,
      minQty3: 30,
    },
  ],
  Pizza: [
    {
      name: "Margherita",
      price: 14,
      specialPrice1: 13,
      specialPrice2: 12,
      specialPrice3: 11,
      minQty1: 10,
      minQty2: 20,
      minQty3: 30,
    },
    {
      name: "Pepperoni",
      price: 16,
      specialPrice1: 15,
      specialPrice2: 14,
      specialPrice3: 13,
      minQty1: 15,
      minQty2: 25,
      minQty3: 35,
    },
    {
      name: "BBQ Chicken",
      price: 18,
      specialPrice1: 17,
      specialPrice2: 16,
      specialPrice3: 15,
      minQty1: 12,
      minQty2: 24,
      minQty3: 36,
    },
  ],
  Pasta: [
    {
      name: "Spaghetti Bolognese",
      price: 13,
      specialPrice1: 12,
      specialPrice2: 11,
      specialPrice3: 10,
      minQty1: 10,
      minQty2: 20,
      minQty3: 30,
    },
    {
      name: "Fettuccine Alfredo",
      price: 14,
      specialPrice1: 13,
      specialPrice2: 12,
      specialPrice3: 11,
      minQty1: 10,
      minQty2: 20,
      minQty3: 30,
    },
  ],
  Salad: [
    {
      name: "Caesar Salad",
      price: 8,
      specialPrice1: 7,
      specialPrice2: 6,
      specialPrice3: 5,
      minQty1: 5,
      minQty2: 10,
      minQty3: 15,
    },
    {
      name: "Greek Salad",
      price: 9,
      specialPrice1: 8,
      specialPrice2: 7,
      specialPrice3: 6,
      minQty1: 8,
      minQty2: 16,
      minQty3: 24,
    },
  ],
};

export const selectPriceUpdate = [
  { value: "Burger", label: "Burger" },
  { value: "Pizza", label: "Pizza" },
  { value: "Pasta", label: "Pasta" },
  { value: "Salad", label: "Salad" },
];
