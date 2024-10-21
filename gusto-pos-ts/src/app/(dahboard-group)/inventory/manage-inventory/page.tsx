"use client";
import { Box, Stack } from "@mui/material";
import { useLocalization } from "@/context/LocalizationProvider";
import Head from "next/head";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import React, { useEffect, useState } from "react";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { ColumnType } from "@/types/table-types";
import {groupOptions,modifierOptions,mockResponse} from "@/mock/inventory"
import InventoryDrawer from "@/components/inventory/InventoryDrawer";


//mock data

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
  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    <Stack>
      <Head>
        <title>{translate("manage_inventory")} - Inventory Management</title>
      </Head>
      <Box>
      <InventoryDrawer
                open={showUserDrawer}
                onClose={() => setShowUserDrawer(false)}
       />
        <Box style={{ marginTop: "15px" }}>

          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            TableTitle={translate("add_inventory")}
            showPrint
            showExcel
            showPdf
            showFilter
            customButtonAction={() => setShowUserDrawer(true)}
            renderFilterElement={
              <Stack direction="row" spacing={2}>
                <SelectInput
                  options={groupOptions}
                  placeholder={translate("select_group")}
                  height="40px"
                />
                <SelectInput
                  options={modifierOptions}
                  placeholder={translate("select_modifier")}
                  height="40px"
                  sx={{mr:2}} 
                />
               </Stack>
            }
          />
        </Box>
        <GSTable
          columns={columns}
          filteredUsers={filteredUsers}
          currentItems={currentItems} // Ensure this is passed
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e, page: number) => setCurrentPage(page)}
          keyMapping={Object.fromEntries(
            columnNames.map((col) => [col.label, col.key]),
          )}
        />
      </Box>
    </Stack>
  );
}
