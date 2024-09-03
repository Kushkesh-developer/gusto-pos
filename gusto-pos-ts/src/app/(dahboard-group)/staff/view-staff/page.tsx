"use client";
import React, { useEffect, useState } from "react";
import {  Typography, Divider} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from '@/theme/theme';
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const columnNames = ["Name", "Phone", "Email", "Role", "Action"];
  const [columnVisibility, setColumnVisibility] = useState({
    Name: true,
    Phone: true,
    Email: true,
    Role: true,
    Action: true,
  });
  type ColumnName = "Name" | "Phone" | "Email" | "Role" | "Action";

  const isColumnName = (name: string): name is ColumnName => {
    return ["Name", "Phone", "Email", "Role", "Action"].includes(name);
  };
  
  const toggleColumnVisibility = (columnName: string) => {
    if (isColumnName(columnName)) {
      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnName]: !prevVisibility[columnName],
      }));
    }
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
        columnNames={columnNames}
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
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        filteredUsers={filteredUsers}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={{
          Name: "username",
          Phone: "phone",
          Email: "email",
          Role: "role",
        }}// Adjust key mapping if needed
       
      />

    </div>
  );
};

export default Page;
