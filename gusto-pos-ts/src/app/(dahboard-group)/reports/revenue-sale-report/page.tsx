"use client";
import { Typography, Divider, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import { reviewmock, filterByType } from "@/mock/reports";
import { theme } from "@/theme/theme";
import { ColumnType } from "@/types/table-types";

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
  const [response] = useState(reviewmock);
  const [filteredUsers, setFilteredUsers] = useState(reviewmock);
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
    <Stack padding={3} spacing={2}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("revenue_sale_report")}
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
          columns.map((col) => [col.label, col.key]),
        )}
      />
    </Stack>
  );
};

export default Page;
