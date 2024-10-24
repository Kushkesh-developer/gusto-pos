"use client";
import { Typography, Divider, Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import { filterByType, TopProductMockData } from "@/mock/reports";
import { theme } from "@/theme/theme";
import { ColumnType } from "@/types/table-types";
const columnNames: ColumnType[] = [
  { label: "itemName", key: "itemName", visible: true },
  { label: "Category", key: "Category", visible: true },
  { label: "Outlet", key: "Outlet", visible: true },
  { label: "Qty", key: "Qty", visible: true },
  { label: "Sale", key: "Sale", visible: true },
];
const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(TopProductMockData);
  const [filteredUsers, setFilteredUsers] = useState(TopProductMockData);
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
      const item =
        ` ${items.id} ${items.itemName} ${items.Category}  ${items.Outlet}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("top_product_reports")}
      </Typography>
      <Divider />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <SelectInput
                options={filterByType}
                placeholder={translate("FilterByOutlet")}
                height="40px"
                sx={{ width: "auto", mr: 2 }}
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
