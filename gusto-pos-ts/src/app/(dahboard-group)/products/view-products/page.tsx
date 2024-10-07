"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
// Mock data
const mockResponse = [
  {
    "Product Name": "Burger 1",
    Order: "1",
    "Created Date": "24-Mar-2020",
    "Show on web": <GSSwitchButton />,
  },
  {
    "Product Name": "Burger 2",
    Order: "2",
    "Created Date": "22-Mar-2020",
    "Show on web": <GSSwitchButton />,
  },
  {
    "Product Name": "Burger 3",
    Order: "3",
    "Created Date": "20-Mar-2020",
    "Show on web": <GSSwitchButton />,
  },
];

const columnNames: ColumnType[] = [
  { label: "Product Name", key: "Product Name", visible: true },
  { label: "Order", key: "Order", visible: true },
  { label: "Created Date", key: "Created Date", visible: true },
  { label: "Show on Web", key: "Show on web", visible: true },
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
  const [columns, setColumns] = useState(columnNames);

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users =
        `${user["Product Name"]} ${user["Created Date"]} ${user.Order} `.toLowerCase();

      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
         {translate("view_product")}
      </Typography>
      <Divider />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add new customer"
          showFilter
          href="/customers/add-customer"
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
