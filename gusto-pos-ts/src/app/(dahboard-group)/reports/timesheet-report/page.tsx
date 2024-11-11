"use client";
import { Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import { timeMock, filterByType } from "@/mock/reports";
import PageHeader from "@/components/widgets/headers/PageHeader";

import { ColumnType } from "@/types/table-types";
const columnNames: ColumnType[] = [
  { label: "StaffName", key: "StaffName", visible: true },
  { label: "Role", key: "Role", visible: true },
  { label: "Outlet", key: "Outlet", visible: true },
  { label: "ClockIn", key: "ClockIn", visible: true },
  { label: "ClockOut", key: "ClockOut", visible: true },
  { label: "TotalTime", key: "TotalTime", visible: true },
  { label: "Total Revenue", key: "TotalRevenue", visible: true },
];

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(timeMock);
  const [filteredUsers, setFilteredUsers] = useState(timeMock);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  useEffect(() => {
    const filteredRows = response.filter((items) => {
      const item = `${items.Outlet}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("time_sheet_report")} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <SelectInput
                options={filterByType}
                placeholder={translate("filter_by_outlet")}
                height="40px"
                variant="theme"  // Pass type as "theme" to enable primary color styling
                placeholderColor="primary"  // Ensures placeholder text color is primary
               
              />
              <SelectInput
                options={filterByType}
                placeholder={translate("FilterByType")}
                height="40px"
                variant="theme"  // Pass type as "theme" to enable primary color styling
                placeholderColor="primary"  // Ensures placeholder text color is primary
              />
            </Stack>
          }
          
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
          columns.map((col) => [col.label, col.key])
        )}
         setFilteredUsers={setFilteredUsers}
      />
    </Box>
  );
};

export default Page;
