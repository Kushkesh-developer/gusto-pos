"use client";
import React, { useEffect, useState } from "react";
import {  Typography, Divider, useTheme} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
const Page = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // Mock data
  const mockResponse = [
    {
      username: "Kevin Tan",
      phone: "8181 2828",
      email: "kevintan23@gmail.com",
      role: "Owner",
    },
    {
      username: "Kevin Tan",
      phone: "8181 2828",
      email: "kevintan@gmail.com",
      role: "Owner",
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
  const columnNames = [
    { label: "Name", key: "username", visible: true },
    { label: "Phone", key: "phone", visible: true },
    { label: "Email", key: "email", visible: true },
    { label: "Role", key: "role", visible: true },
    { label: "Action", key: "action", visible: true },
  ];
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(columnNames.map((col) => [col.label, col.visible]))
  );

 
  
  const toggleColumnVisibility = (columnName: string) => {
  
      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnName]: !prevVisibility[columnName],
      }));
    
  };


  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.username} ${user.phone} ${user.email}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

 
  return (
    <div style={{padding:"24px"}} >
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Staff
      </Typography>
      <Divider />
      <div style={{marginTop:"15px"}}>
      <GSTableControls
        setSearchQuery={setSearchQuery}
        columnNames={columnNames.map((col) => col.label)}
        columnVisibility={columnVisibility}
        toggleColumnVisibility={toggleColumnVisibility}
        TableTitle="Add new staff"
        showPrint
        showExcel
        showPdf
        showFilter
        href="/staff/add-staff"
      />
      </div>
      <GSTable
        columnNames={columnNames.map((col) => col.label)}
        columnVisibility={columnVisibility}
        filteredUsers={filteredUsers}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(columnNames.map((col) => [col.label, col.key]))}

       
      />

    </div>
  );
};

export default Page;
