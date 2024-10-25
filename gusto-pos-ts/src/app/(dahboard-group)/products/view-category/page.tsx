"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import { categoryMock } from "@/mock/products";
import PageHeader from "@/components/widgets/headers/PageHeader";

const columnNames: ColumnType[] = [
  { label: "Category Name", key: "Category Name", visible: true },
  { label: "Order", key: "Order", visible: true },
  { label: "Image", key: "Image", visible: true },
  { label: "Created Date", key: "Created Date", visible: true },
  { label: "Show on Web", key: "Show on Web", visible: true },
  { label: "Show on POS", key: "Show on POS", visible: true },
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
        handler: () => console.log("delete"),
      },
    ],
  },
];
// Mock data

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(categoryMock);
  const [filteredUsers, setFilteredUsers] = useState(categoryMock);
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
        `${user["Category Name"]} ${user["Created Date"]} ${user.Order} `.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("view_category")} />

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
        keyMapping={Object.fromEntries(
          columnNames.map((col) => [col.label, col.key])
        )}
      />
    </Box>
  );
};

export default Page;
