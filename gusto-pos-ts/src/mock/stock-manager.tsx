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
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "2",
    title: "Jeans",
    category: "fashion",
    price: 1500,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "3",
    title: "Jacket",
    category: "fashion",
    price: 2500,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "4",
    title: "Sneakers",
    category: "fashion",
    price: 2000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "5",
    title: "Dress",
    category: "fashion",
    price: 3000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },

  // Category: Home
  {
    id: "6",
    title: "Chair",
    category: "home",
    price: 1200,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "7",
    title: "Desk",
    category: "home",
    price: 5000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "8",
    title: "Bookshelf",
    category: "home",
    price: 3000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "9",
    title: "Lamp",
    category: "home",
    price: 800,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "10",
    title: "Sofa",
    category: "home",
    price: 12000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },

  // Category: Electronics
  {
    id: "11",
    title: "Laptop",
    category: "electronics",
    price: 75000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "12",
    title: "Headphones",
    category: "electronics",
    price: 3000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "13",
    title: "Smartwatch",
    category: "electronics",
    price: 8000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "14",
    title: "Camera",
    category: "electronics",
    price: 50000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "15",
    title: "Tablet",
    category: "electronics",
    price: 30000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },

  // Category: Food
  {
    id: "16",
    title: "Noodles",
    category: "food",
    price: 1400,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "17",
    title: "Pizza",
    category: "food",
    price: 1800,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "18",
    title: "Burger",
    category: "food",
    price: 1200,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "19",
    title: "Pasta",
    category: "food",
    price: 1500,
    image: "https://dummyimage.com/400x600/cccccc/000000",
  },
  {
    id: "20",
    title: "Salad",
    category: "food",
    price: 1000,
    image: "https://dummyimage.com/400x600/cccccc/000000",
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
