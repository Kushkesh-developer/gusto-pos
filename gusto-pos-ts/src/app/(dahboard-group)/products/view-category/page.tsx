
"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
  
const columnNames = [
  { label:"Category Name", key: "Category Name", visible: true },
  { label: "Order", key: "Order", visible: true },
  { label: "Image", key: "Image", visible: true },
  { label: "Created Date", key: "Created Date", visible: true },
  { label: "Show on Web", key: "Show on Web", visible: true,},
  { label: "Show on POS", key: "Show on POS", visible: true },
  { label: "Action", key: "action", visible: true,  isAction: true},
];
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
const Page = () => {
  const theme = useTheme();
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
  const [columns, setColumns] = useState(columnNames)
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
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
      View Category
      </Typography>
      <Divider />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add new category"
          showPrint
          showExcel
          showPdf
          showFilter
          href="/staff/add-staff"
        />
      </Box>
      <GSTable
        columns={columns}
        filteredUsers={filteredUsers}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(columnNames.map((col) => [col.label, col.key]))}
      />
    </Box>
  );
};

export default Page;
