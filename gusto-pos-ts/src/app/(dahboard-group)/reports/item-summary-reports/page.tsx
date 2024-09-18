"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, Stack, useTheme } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { mockResponse, FilterByOutlet, FilterByType } from "@/mock/mock"; // Import mock data and filters

const Page = () => {
  const { translate } = useLocalization();
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State for column visibility
  const [columnVisibility, setColumnVisibility] = useState({
    itemName: true,
    Outlet: true,
    Qty: true,
    Unit: true,
    MinQty: true,
    MaxQty: true,
    ItemType: true,
  });

  // Define the column names based on the mock data
  type ColumnName =
    | "itemName"
    | "Outlet"
    | "Qty"
    | "Unit"
    | "MinQty"
    | "MaxQty"
    | "ItemType";

  // Function to check if a column name is valid
  const isColumnName = (name: string): name is ColumnName => {
    return [
      "itemName",
      "Outlet",
      "Qty",
      "Unit",
      "MinQty",
      "MaxQty",
      "ItemType",
    ].includes(name);
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockResponse.slice(indexOfFirstItem, indexOfLastItem);
  const columnNames = [
    "itemName",
    "Outlet",
    "Qty",
    "Unit",
    "MinQty",
    "MaxQty",
    "ItemType",
  ];
  const totalPages = Math.ceil(mockResponse.length / itemsPerPage);

  // Function to toggle column visibility
  const toggleColumnVisibility = (columnName: string) => {
    if (isColumnName(columnName)) {
      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnName]: !prevVisibility[columnName],
      }));
    }
  };

  // Filter users based on search query
  useEffect(() => {
    const sanitizedSearch = searchQuery.toLowerCase().trim();
    const filteredRows = mockResponse.filter((item) => {
      const fieldsToSearch =
        `${item.itemName} ${item.Outlet} ${item.Qty} ${item.Unit} ${item.MinQty} ${item.MaxQty} ${item.ItemType}`.toLowerCase();
      return fieldsToSearch.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery]);

  return (
    <Stack padding={3} spacing={2}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        Item Summary Reports
      </Typography>
      <Divider />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <SelectInput
                options={FilterByOutlet}
                placeholder={translate("FilterByOutlet")}
                height="40px"
                sx={{ width: "auto" }}
              />
              <SelectInput
                options={FilterByType}
                placeholder={translate("FilterByType")}
                height="40px"
                sx={{ width: "auto", mr: 3 }}
              />
            </Stack>
          }
          columnNames={columnNames}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          showPrint
          showExcel
          showPdf
          showFilter
        />
      </Stack>
      <GSTable
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        filteredUsers={filteredUsers}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={{
          itemName: "itemName",
          Outlet: "Outlet",
          Qty: "Qty",
          Unit: "Unit",
          MinQty: "MinQty",
          MaxQty: "MaxQty",
          ItemType: "ItemType",
        }} // Adjust key mapping if needed
      />
    </Stack>
  );
};

export default Page;
