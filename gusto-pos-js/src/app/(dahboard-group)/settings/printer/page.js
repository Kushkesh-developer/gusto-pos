"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";

import { useLocalization } from "@/context/LocalizationProvider";
import { printerMock } from "@/mock/setting";
import PrinterDrawer from "@/components/settings/PrinterDrawer";
import PageHeader from "@/components/widgets/headers/PageHeader";

const Page = () => {
  // Mock data

  const { translate } = useLocalization();
  const [response] = useState(printerMock);
  const [filteredColumns, setFilteredColumns] = useState(printerMock);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const columnNames = [
  { label: "Printer Name", key: "printerName", visible: true },
  { label: "Type", key: "type", visible: true },
  { label: "Outlet", key: "outlet", visible: true },
  { label: "Category", key: "category", visible: true },
  {
    label: "Action",
    key: "action",
    visible: true,
    isAction: true,
    actions: [
    {
      type: "edit",
      // eslint-disable-next-line no-console
      handler: (id) => handleEdit(id)
    },
    {
      type: "delete",
      // eslint-disable-next-line no-console
      handler: (id) => handleDelete(id)
    }]

  }];

  const handleEdit = (id) => {
    // eslint-disable-next-line no-console
    console.log("Edit user with ID:", id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id) => {
    // eslint-disable-next-line no-console
    console.log("Delete user with ID:", id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) =>
    prevUsers.filter((user) => user.id !== id)
    );
  };
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData =
      `${user.printerName} ${user.type} ${user.outlet}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("printer")} />

      <PrinterDrawer
        open={showUserDrawer}
        onClose={() => setShowUserDrawer(false)} />

      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate("add_printer")}
          showPrint
          showExcel
          showPdf
          showFilter
          currentItems={currentItems}
          customButtonAction={() => setShowUserDrawer(true)} />

      </Box>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns} />

    </Box>);

};

export default Page;