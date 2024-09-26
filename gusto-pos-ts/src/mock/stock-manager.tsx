export const product_mock_data = [
  {
    id: "1",
    title: "Noodles",
    tests: "Test 11",
    price: 1400,
    image: "/images/product.jpg",
  },
  {
    id: "2",
    title: "Spaghetti",
    tests: "Test 101",
    price: 1400,
    image: "/images/product.jpg",
  },
  {
    id: "3",
    title: "Test",
    tests: "Test 101",
    price: 1400,
    image: "/images/product.jpg",
  },
  {
    id: "4",
    title: "Spaghetti",
    tests: "Test 101",
    price: 1400,
    image: "/images/product.jpg",
  },
  {
    id: "5",
    title: "Spaghetti",
    tests: "Test 102",
    price: 1400,
    image: "/images/product.jpg",
  },
];

export const columnNames = [
  { key: "id", label: "#", visible: true },
  { key: "title", label: "Name", visible: true },
  { key: "quantity", label: "Quantity", visible: true },
  { key: "price", label: "Sub Total", visible: true },
  {
    label:"Action",
    key:"action",
    visible: true,
    isAction:true,
    actions:[
     { type:"edit",
      handler:()=>console.log("Edit")},
      {type:"delete",handler:()=>console.log("Delete")}
    ]
  }
];
