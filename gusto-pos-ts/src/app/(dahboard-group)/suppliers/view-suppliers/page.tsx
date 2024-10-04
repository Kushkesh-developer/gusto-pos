"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { ColumnType } from "@/types/table-types";
// Mock data
const mockResponse = [
  {
    "Company Name": "ABC Corporation",
    "Contact Person": "John Doe",
    Mobile: "+1234567890",
    Office: "+9876543210",
    Email: "john.doe@example.com",
    
    "Postal Code": "12345",
  },
  {
    "Company Name": "XYZ Enterprises",
    "Contact Person": "Jane Smith",
    Mobile: "+1987654321",
    Office: "+8765432109",
    Email: "jane.smith@example.com",
    "Postal Code": "54321",
  },
  {
    "Company Name": "PQR Industries",
    "Contact Person": "Alice Johnson",
    Mobile: "+1122334455",
    Office: "+9988776655",
    Email: "alice.johnson@example.com",
    "Postal Code": "67890",
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
  // Centralized column configuration
  const columnNames:ColumnType[] = [
    { label: "Company Name", key: "Company Name", visible: true },
    { label: "Contact Person", key: "Contact Person", visible: true },
    { label: "Mobile", key: "Mobile", visible: true },
    { label: "Office", key: "Office", visible: true },
    { label: "Email", key: "Email", visible: true },
    { label: "Postal Code", key: "Postal Code", visible: true },
    {
      label:"Action",
      key:"action",
      visible: true,
      isAction:true,
      actions:[
       { type:"edit",
          // eslint-disable-next-line no-console
        handler:()=>console.log("Edit")},
          // eslint-disable-next-line no-console
        {type:"delete",handler:()=>console.log("Delete")}
      ]
    }
  ];
  const [columns, setColumns] = useState(columnNames);

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users =
        `${user["Company Name"]} ${user["Contact Person"]} ${user.Mobile} ${user.Office} ${user.Email}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Supplier
      </Typography>
      <Divider />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add new supplier"
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
        keyMapping={Object.fromEntries(
          columnNames.map((col) => [col.label, col.key]),
        )}
      />
    </Box>
  );
};

export default Page;
