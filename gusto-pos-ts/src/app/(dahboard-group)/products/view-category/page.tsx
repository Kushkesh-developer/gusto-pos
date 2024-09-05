"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
const Page = () => {
  // Mock data
  const mockResponse = [
    {
      "Category Name": "Burger 1",
      Order: "1",
      Image:"Main.jpg",
      "Created Date": "24-Mar-2020",
      "Show on Web": <GSSwitchButton />,
      "Show on POS": <GSSwitchButton />,
    },
    {
      "Category Name": "Burger 2",
      Order: "2",
      Image:"Main.jpg",
      "Created Date": "22-Mar-2020",
      "Show on Web": <GSSwitchButton />,
      "Show on POS": <GSSwitchButton />,
    },
    {
      "Category Name": "Burger 3",
      Order: "3",
      Image:"Main.jpg",
      "Created Date": "20-Mar-2020",
      "Show on Web": <GSSwitchButton />,
      "Show on POS": <GSSwitchButton />,
    },
  ];

  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const columnNames = [
    "Category Name",
    "Order",
    "Image",
    "Created Date",
    "Show on Web",
    "Show on POS",
    "Action",
  ];
  const [columnVisibility, setColumnVisibility] = useState({
    "Category Name": true,
    Order: true,
    Image:true,
    "Created Date": true,
    "Show on Web": true,
    "Show on POS": true,
    Action: true,
  });

  const toggleColumnVisibility = (columnName: string) => {
    setColumnVisibility((prevVisibility: any) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
        const users = `${user["Category Name"]} ${user["Created Date"]} ${user.Order} `.toLowerCase();

      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Category
      </Typography>
      <Divider />
      <div style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          columnNames={columnNames}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          TableTitle="Add new category"
          showFilter
          href="/customers/add-customer"
        />
      </div>
      <GSTable
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        filteredUsers={filteredUsers}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={{
            "Category Name": "Category Name",
            Order: "Order",
            Image:"Image",
            "Created Date": "Created Date",
            "Show on Web": "Show on Web",
            "Show on POS": "Show on POS",
          }}
      />
    </div>
  );
};

export default Page;
