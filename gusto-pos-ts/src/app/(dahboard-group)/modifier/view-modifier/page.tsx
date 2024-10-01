"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { ColumnType } from "@/types/Table-types";
const groupOptions = [
  { label: "Hot", value: "hot" },
  { label: "Cold", value: "cold" },
];

const modifierOptions = [
  { label: "Onion Ring", value: "onionRing" },
  { label: "Coleslaw", value: "coleslaw" },
];
const mockResponse = [
  {
    modifier: "Onion Ring",
    group: "Hot",
    location: "Chai Chee",
    price: "$1.00",
  },
  {
    modifier: "Coleslaw",
    group: "Cold",
    location: "Chai Chee",
    price: "$1.00",
  },
];
// Centralized column configuration
const columnNames: ColumnType[] = [
  { label: "Modifier / Add on", key: "modifier", visible: true },
  { label: "Group", key: "group", visible: true },
  { label: "Location", key: "location", visible: true },
  { label: "Price", key: "price", visible: true },
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
const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
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
        `${items.modifier} ${items.group} ${items.location}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Stack padding={3} spacing={2}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Modifier
      </Typography>
      <Divider />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add new modifier"
          href="/customers/add-customer"
          showFilter
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <SelectInput
                options={groupOptions}
                placeholder={translate("FilterByOutlet")}
                height="40px"
                sx={{ width: "auto" }}
              />
              <SelectInput
                options={modifierOptions}
                placeholder={translate("FilterByType")}
                height="40px"
                sx={{ width: "auto", mr: 3 }}
              />
            </Stack>
          }
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
