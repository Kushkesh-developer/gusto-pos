import Image from 'next/image'; 
 export const floorOptions = [
    { label: "One", value: "One" },
    { label: "Two", value: "Two" },
  ];
  
 export  const outletsOptions = [
    { label: "Outlet 1", value: "outlet1" },
    { label: "Outlet 2", value: "outlet2" },
  ];
 export  const mockResponse = [
    {
      order: "1",
      Name: "Owner",
      outlets: "Chai Chee",
      image: <Image alt=".." src="/images/product.jpg" width={80} height={80} />,
      status: <span style={{ color: "gray" }}>Waiting</span>,
      startDate: "01 Jan 2020",
      endDate: "01 Jan 2020",
      impression: "530",
    },
    {
      order: "2",
      Name: "Cashier",
      outlets: "Chai Chee",
      image: <Image alt=".." src="/images/product.jpg" width={80} height={80} />,
      status: <span style={{ color: "gray" }}>Waiting</span>,
      startDate: "01 Jan 2020",
      endDate: "01 Jan 2020",
      impression: "530",
    },
    // Add more mock data as needed
  ];