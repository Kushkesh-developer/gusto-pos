"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box, Stack, Button } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import { PaymentmockResponse } from "@/mock/setting"
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import PaymentDrawer from "@/components/settings/PaymentDrawer";

const Page = () => {
  // Mock data

  const { translate } = useLocalization();
  const [response] = useState(PaymentmockResponse);
  const [filteredUsers, setFilteredUsers] = useState(PaymentmockResponse);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const columnNames: ColumnType[] = [
    { label: "Printer Name", key: "paymentType", visible: true },
    { label: "Provider", key: "provider", visible: true },
    { label: "Status", key: "status", visible: true },
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
  const [columns, setColumns] = useState(columnNames);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.paymentType} ${user.provider}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("payment_types")}
      </Typography>
      <Divider />
      <PaymentDrawer
        open={showUserDrawer}
        onClose={() => setShowUserDrawer(false)} />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle={translate("add_payment_types")}
          showPrint
          showExcel
          showPdf
          showFilter
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
