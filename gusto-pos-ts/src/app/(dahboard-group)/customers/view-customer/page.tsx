"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
const Page = () => {
  // Mock data
  const mockResponse = [
    {
      username: "Tan",
      group: "Group B",
      email: "kevintan@gmail.com",
      DateOfLastPurchase: "12/1/2020",
      Loyalty:"yes",
      Points: 0,
    },
    {
      username: "Kevin Tan",
      group: "Group A",
      email: "kevintan@gmail.com",
      DateOfLastPurchase: "12/1/2020",
      Loyalty:"yes",
      Points: 0,
    },
    // Add more mock data as needed
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
 
  // Centralized column configuration
  const columns = [
    { label: "Name", key: "username", visible: true },
    { label: "Group", key: "group", visible: true },
    { label: "Email", key: "email", visible: true },
    { label: "Date of last purchase", key: "DateOfLastPurchase", visible: true },
    { label: "Loyalty", key: "Loyalty", visible: true },
    { label: "Points", key: "Points", visible: true },
    { label: "Action", key: "action", visible: true },
  ];
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(columns.map((col) => [col.label, col.visible]))
  );

  const toggleColumnVisibility = (columnName: string) => {
    setColumnVisibility((prevVisibility: any) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users =
        `${user.username} ${user.group} ${user.email}`.toLowerCase();
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
          columnNames={columns.map((col) => col.label)}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          TableTitle="Add new customer"
          showPrint
          showExcel
          showPdf
          showFilter
          href="/customers/add-customer"
        />
      </div>
      <GSTable
        columnNames={columns.map((col) => col.label)}
        columnVisibility={columnVisibility}
        filteredUsers={filteredUsers}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(columns.map((col) => [col.label, col.key]))}

      />
    </div>
  );
};

export default Page;
