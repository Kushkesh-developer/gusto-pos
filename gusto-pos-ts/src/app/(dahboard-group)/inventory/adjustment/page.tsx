"use client";

import { Box } from "@mui/material";
import { useLocalization } from "@/context/LocalizationProvider";
import Head from "next/head";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import React, { useEffect, useState } from "react";
import { ColumnType } from "@/types/Table-types";
//mock Data
const mockData = [
  {
    reference: "NM219312N",
    item: "Burger Bun",
    quantity: 50,
    date: "17/09/2020 (20:43)",
    from: "Bukit Batok",
    to: "Chai Chee",
    status: "In progress",
  },
  {
    reference: "NM219312N",
    item: "Burger Bun",
    quantity: 50,
    date: "17/09/2020 (20:43)",
    from: "Bukit Batok",
    to: "Chai Chee",
    status: "Transferred",
  },
];
const columnNames: ColumnType[] = [
  { label: "Reference", key: "reference", visible: true },
  { label: "Item", key: "item", visible: true },
  { label: "Quantity", key: "quantity", visible: true },
  { label: "Date", key: "date", visible: true },
  { label: "From", key: "from", visible: true },
  { label: "To", key: "to", visible: true },
  { label: "Status", key: "status", visible: true },
];

export default function ManageInventoryPage() {
  const { translate } = useLocalization();
  const [response] = useState(mockData);
  const [filteredUsers, setFilteredUsers] = useState(mockData);
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
      const users = `${user.reference} ${user.item}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <>
      <Head>
        <title>{translate("adjustment")}</title>
      </Head>
      <Box>
        <Box style={{ marginTop: "15px" }}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            TableTitle="Add new staff"
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
    </>
  );
}
