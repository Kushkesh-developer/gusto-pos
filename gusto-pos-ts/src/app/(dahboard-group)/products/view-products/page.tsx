"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
const Page = () => {
  // Mock data
  const mockResponse = [
    {
      "Product Name": "Burger 1",
      Order: "1",
      "Created Date": "24-Mar-2020",
    },
    {
      "Product Name": "Burger 2",
      Order: "2",
      "Created Date": "22-Mar-2020",
    },
    {
      "Product Name": "Burger 3",
      Order: "3",
      "Created Date": "20-Mar-2020",
      "Show on web": "<SwitchLabel />",
    },
  ];

  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const columnNames = [
    "Product Name",
    "Order",
    "Created Date",
    "Show on Web",
    "Action",
  ];
  const [columnVisibility, setColumnVisibility] = useState({
    "Product Name": true,
    Order: true,
    "Created Date": true,
    "Show on Web": true,
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
        const users = `${user["Product Name"]} ${user["Created Date"]} ${user.Order} `.toLowerCase();

      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Customer
      </Typography>
      <Divider />
      <div style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          columnNames={columnNames}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          TableTitle="Add new customer"
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
            "Product Name": "Product Name",
            Order: "Order",
            "Created Date": "Created Date",
            "Show on Web": "Show on Web",
          }}
      />
    </div>
  );
};

export default Page;
