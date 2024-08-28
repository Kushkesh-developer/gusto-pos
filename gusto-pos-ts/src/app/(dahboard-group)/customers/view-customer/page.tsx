"use client";
import React, { useEffect, useState } from "react";
import {  Typography, Divider} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from '@/theme/theme';
const Page = () => {
  // Mock data
  const mockResponse = [
    {
      username: "Tan",
      group: "Group B",
      email: "kevintan@gmail.com",
      DateOfLastPurchase: "12/1/2020",
      LoyaltyPoints: 0,
    },
    {
      username: "Kevin Tan",
      group: "Group A",
      email: "kevintan@gmail.com",
      DateOfLastPurchase: "12/1/2020",
      LoyaltyPoints: 0,
    },
    // Add more mock data as needed
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
  const columnNames = ["Name", "Group", "Email", "Date of last purchase", "Loyalty" ,"Points"	,"Action"];
  const [columnVisibility, setColumnVisibility] = useState({
    Name: true,
    Group: true,
    Email: true,
    "Date of last purchase": true,
    "Loyalty Points": true,
    Action: true,
  });

  const toggleColumnVisibility = (columnName: string) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.username} ${user.group} ${user.email}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

 
  return (
    <div style={{padding:"24px"}} >
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Customer
      </Typography>
      <Divider />
      <div style={{marginTop:"15px"}}>
      <GSTableControls
        setSearchQuery={setSearchQuery}
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        toggleColumnVisibility={toggleColumnVisibility}
        TableTitle="Add new customer"
        showPrint
        showExcel
        showPdf
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
          Name: "username",
          Group: "group",
          Email: "email",
          "Date of last purchase": "DateOfLastPurchase",
          "Loyalty Points": "LoyaltyPoints",
        }}
       
      />

    </div>
  );
};

export default Page;
