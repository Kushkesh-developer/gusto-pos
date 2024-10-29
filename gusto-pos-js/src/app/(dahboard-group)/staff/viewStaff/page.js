"use client";
import React, { useEffect, useState } from "react";
import {  Box, Divider } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import PageHeader from "@/components/widgets/headers/PageHeader";

const Page = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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

  const toggleColumnVisibility = (columnName) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users =
        `${user.username} ${user.phone} ${user.email}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  // Handle filter button click
  const handleFilterClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <Box style={{ padding: 3 }}>
            <PageHeader title={translate("view_staff")} />

      <Box style={{ marginTop: 5 }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          columnNames={columnNames}
          columnVisibility={columnVisibility}
          handleFilterClick={handleFilterClick}
          anchorEl={anchorEl}
          id={id}
          open={open}
          toggleColumnVisibility={toggleColumnVisibility}
          tableTitle="Add new staff"
          print
          excel
          pdf
          href="/staff/add-staff"
        />
      </Box>
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
        }} // Adjust key mapping if needed
      />
    </Box>
  );
};

export default Page;
