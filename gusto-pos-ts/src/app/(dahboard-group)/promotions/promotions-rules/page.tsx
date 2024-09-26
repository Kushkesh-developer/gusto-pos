"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
// import { useLocalization } from "@/context/LocalizationProvider";
import { mockResponse } from "@/mock/discount";
// import SelectInput from "@/components/widgets/inputs/GSSelectInput";
// import SelectInput from "@mui/material/Select/GSSelectInput";

const columnNames = [
  { label: "Name", key: "Name", visible: true },
  { label: "DiscountValue", key: "DiscountValue", visible: true },
  { label: "startDate", key: "startDate", visible: true },
  { label: "EndDate", key: "EndDate", visible: true },
  {
    label:"Action",
    key:"action",
    visible: true,
    isAction:true,
    actions:[
     { type:"edit",
      handler:()=>console.log("Edit")},
      {type:"delete",handler:()=>console.log("Delete")}
    ]
  }
];

const Page = () => {
  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filteredRows = response.filter((item) => {
      const itemName = `${item.Name}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return itemName.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  return (
    <Stack padding={3} spacing={2}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        Promotion Rules
      </Typography>
      <Divider />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add Promotion Rules"
          href="/discount/add-discount-options"
          showPrint
          showExcel
          showPdf
          showFilter
        />
      </Stack>
      <GSTable
        columns={columns}
        filteredUsers={filteredUsers}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(
          columns.map((col) => [col.label, col.key]),
        )}
      />
    </Stack>
  );
};

export default Page;
