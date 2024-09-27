"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { ColumnType } from "@/types/TableTypes";
const Page = () => {
  // Mock data
  const mockResponse = [
    {
      outletId: "1",
      name: "Chai Chee",
      address: "#01-19 Viva Business Park, 750 Chai Chee Rd, Singapore 469000",
      postal: "469000",
      phone: "6920 2093",
    },
    {
      outletId: "2",
      name: "Chai Chee",
      address: "#01-19 Viva Business Park, 750 Chai Chee Rd, Singapore 469000",
      postal: "469000",
      phone: "6920 2093",
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

  const columnNames:ColumnType[] = [
    { label: "Outlet Id", key: "outletId", visible: true },
    { label: "Name", key: "name", visible: true },
    { label: "Address", key: "address", visible: true },
    { label: "Postal", key: "postal", visible: true },
    { label: "Phone", key: "phone", visible: true },
    {
      label:"Action",
      key:"action",
      visible: true,
      isAction:true,
      actions:[
       { type:"edit",
          // eslint-disable-next-line no-console
        handler:()=>console.log("Edit")},
        {type:"delete",
            // eslint-disable-next-line no-console
          handler:()=>console.log("delete")}
      ]
    }
  ];
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData =
        `${user.outletId} ${user.name} ${user.address}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        Promotion Rules
      </Typography>
      <Divider />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add New Outlet"
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
