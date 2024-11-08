"use client";
import { Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import { revenueMock, filterByType } from "@/mock/reports";

import { ColumnType } from "@/types/table-types";
import PageHeader from "@/components/widgets/headers/PageHeader";

const columnNames: ColumnType[] = [
  { label: "Date", key: "Date", visible: true },
  { label: "Outlet", key: "Outlet", visible: true },
  { label: "Sale", key: "Sale", visible: true },
  { label: "Tax", key: "Tax", visible: true },
  { label: "DiscAmount", key: "DiscAmount", visible: true },
  { label: "Cost", key: "Cost", visible: true },
  {
    label: "Action",
    key: "action",
    visible: true,
    isAction: true,
    actions: [
      {
        type: "visibility",
        // eslint-disable-next-line no-console
        handler: () => console.log("Visible"),
      },
    ],
  },
];
const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(revenueMock);
  const [filteredUsers, setFilteredUsers] = useState(revenueMock);
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
      <PageHeader title={translate("revenue_sale_report")} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          renderFilterElement={
            <Stack direction="row"  spacing={2}>
              <SelectInput
                options={filterByType}
                placeholder={translate("filter_by_outlet")}
                height="40px"
                variant="theme"  // Pass type as "theme" to enable primary color styling
                placeholderColor="primary"  // Ensures placeholder text color is primary
                sx={{ width: "auto" }}
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
      />
    </Box>
  );
};

export default Page;
