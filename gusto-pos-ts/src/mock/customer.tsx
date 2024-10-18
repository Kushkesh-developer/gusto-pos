 export const mockResponse = [
    {
      username: "Tan",
      group: "Group B",
      email: "kevintan@gmail.com",
      DateOfLastPurchase: "12/1/2020",
      Loyalty: "yes",
      Points: 0,
    },
    {
      username: "Kevin Tan",
      group: "Group A",
      email: "kevintan@gmail.com",
      DateOfLastPurchase: "12/1/2020",
      Loyalty: "yes",
      Points: 0,
    },
    // Add more mock data as needed
  ];
 export  const mockResponsedata = [
    {
      customerGroup: "Group A",
    },
    {
      customerGroup: "Group B",
    },
  ];
  const columnNames:ColumnType[] = [
    { label: "CustomerGroup", key: "customerGroup", visible: true },
  
    { label: "Action", key: "action", visible: true, isAction: true },
  ];