"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
// Mock data

// interface ColumnType {
//   label: string;
//   key: string;
//   visible: boolean;
//   isAction?: boolean;
//   actions?: ActionType[]; // Optional, but required for action columns
// }
const mockResponse = [
  {
    username: "Tan",
    group: "Group B",
    email: "kevintan@gmail.com",
    DateOfLastPurchase: "12/1/2020",
    Loyalty: "yes",
    Points: 0,
  },
  {
    username: "Kevin Tan",
    group: "Group A",
    email: "kevintan@gmail.com",
    DateOfLastPurchase: "12/1/2020",
    Loyalty: "yes",
    Points: 0,
  },
  // Add more mock data as needed
];
// Centralized column configuration
const columnNames: ColumnType[] = [
  { label: "Name", key: "username", visible: true },
  { label: "Group", key: "group", visible: true },
  { label: "Email", key: "email", visible: true },
  { label: "Date of last purchase", key: "DateOfLastPurchase", visible: true },
  { label: "Loyalty", key: "Loyalty", visible: true },
  { label: "Points", key: "Points", visible: true },
  {
    label: "Action",
    key: "action",
    visible: true,
    isAction: true,
    actions: [
      {
        type: "edit",
        // eslint-disable-next-line no-console
        handler: () => console.log("Edit"),
      },
      {
        type: "delete",
        // eslint-disable-next-line no-console
        handler: () => console.log("Delete"),
      },
    ],
  },
];
const Page = () => {
  const { translate } = useLocalization();
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
  const [columns, setColumns] = useState(columnNames);

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
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("view_customer")}
      </Typography>
      <Divider />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add new customer"
          showPrint
          showExcel
          showPdf
          showFilter
          href="/customers/add-customers"
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
