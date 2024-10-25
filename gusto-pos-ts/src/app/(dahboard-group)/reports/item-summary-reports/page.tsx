"use client";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { useLocalization } from "@/context/LocalizationProvider";

import { itemMock, filterByOutlet, filterByType } from "@/mock/reports"; // Import mock data and filters
import { ColumnType } from "@/types/table-types";
import PageHeader from "@/components/widgets/headers/PageHeader";

const columnNames: ColumnType[] = [
  { label: " itemName", key: "itemName", visible: true },
  { label: "Outlet", key: "Outlet", visible: true },
  { label: "Qty", key: "Qty", visible: true },
  { label: "Unit", key: "Unit", visible: true },
  { label: "MinQty", key: "MinQty", visible: true },
  { label: "MaxQty", key: "MaxQty", visible: true },
  { label: "ItemType", key: "ItemType", visible: true },
];
const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(itemMock);
  const [filteredUsers, setFilteredUsers] = useState(itemMock);

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
        `${items.itemName} ${items.Outlet}  ${items.Qty}  ${items.Unit} ${items.ItemType}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Stack padding={3} spacing={2}>
      <PageHeader title={translate("item_summary_reports")} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <SelectInput
                options={filterByOutlet}
                placeholder={translate("FilterByOutlet")}
                height="40px"
                sx={{ width: "auto" }}
              />
              <SelectInput
                options={filterByType}
                placeholder={translate("FilterByType")}
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
    </Stack>
  );
};

export default Page;
