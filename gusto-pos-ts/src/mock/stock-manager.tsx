import { ColumnType } from "@/types/table-types";

export const product_categories = [
  {
    label: "Fashion",
    value: "fashion",
    icon: "👗", // replace with actual icon path
  },
  {
    label: "Home",
    value: "home",
    icon: "🏠", // replace with actual icon path
  },
  {
    label: "Electronics",
    value: "electronics",
    icon: "💻", // replace with actual icon path
  },
  {
    label: "Food",
    value: "food",
    icon: "🍔", // replace with actual icon path
  },
];

export const product_mock_data = [
  // Category: Fashion
  {
    id: "1",
    title: "T-Shirt",
    category: "fashion",
    price: 500,
    image: "/assets/products/t-shirt.jpg",
  },
  {
    id: "2",
    title: "Jeans",
    category: "fashion",
    price: 1500,
    image: "/assets/products/jeans.jpg",
  },
  {
    id: "4",
    title: "Sneakers",
    category: "fashion",
    price: 2000,
    image: "/assets/products/sneakers.jpg",
  },
  // Category: Home
  {
    id: "6",
    title: "Chair",
    category: "home",
    price: 1200,
    image: "/assets/products/chair.jpg",
  },
  {
    id: "7",
    title: "Desk",
    category: "home",
    price: 5000,
    image: "/assets/products/desk.jpg",
  },
  {
    id: "9",
    title: "Lamp",
    category: "home",
    price: 800,
    image: "/assets/products/lamp.jpg",
  },

  // Category: Electronics
  {
    id: "11",
    title: "Laptop",
    category: "electronics",
    price: 75000,
    image: "/assets/products/laptop.jpg",
  },
  {
    id: "12",
    title: "Headphones",
    category: "electronics",
    price: 3000,
    image: "/assets/products/headphone.jpg",
  },
  {
    id: "13",
    title: "Smartwatch",
    category: "electronics",
    price: 8000,
    image: "/assets/products/smartwatch.jpg",
  },

  // Category: Food
  {
    id: "17",
    title: "Pizza",
    category: "food",
    price: 1800,
    image: "/assets/products/pizza.jpg",
  },
  {
    id: "18",
    title: "Burger",
    category: "food",
    price: 1200,
    image: "/assets/products/burger.jpg",
  },
  {
    id: "19",
    title: "Pasta",
    category: "food",
    price: 1500,
    image: "/assets/products/pasta.jpg",
  },
  {
    id: "20",
    title: "Salad",
    category: "food",
    price: 1000,
    image: "/assets/products/salad.jpg",
  },
];
export const userList = [
  {
    label: "Test User",
    value: "user1",
  },
  {
    label: "Test user 2",
    value: "user2",
  },
];

export const columnNames: ColumnType[] = [
  { key: "id", label: "#", visible: true },
  { key: "title", label: "Name", visible: true },
  { key: "quantity", label: "Quantity", visible: true },
  { key: "price", label: "Sub Total", visible: true },
  {
    label: "Action",
    key: "action",
    visible: true,
    isAction: true,
    actions: [
      {
        type: "delete",
        // eslint-disable-next-line no-console
        handler: () => console.log("delete"),
      },
    ],
  },
];
