"use client";
import { Box, Stack ,Button} from "@mui/material";
import { useLocalization } from "@/context/LocalizationProvider";
import Head from "next/head";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import React, { useEffect, useState } from "react";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { ColumnType } from "@/types/table-types";
import InventoryDrawer from "@/components/inventory/InventoryDrawer";
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
const groupOptions = [
  { label: "Hot", value: "hot" },
  { label: "Cold", value: "cold" },
];

const modifierOptions = [
  { label: "Onion Ring", value: "onionRing" },
  { label: "Coleslaw", value: "coleslaw" },
];
//mock data
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
            TableTitle="Add new staff"
            showPrint
            showExcel
            showPdf
            showFilter
            renderFilterElement={
              <Stack direction="row" spacing={2}>
                  <Button
                    onClick={() => setShowUserDrawer(true)}
                   variant="contained" // Optional: choose button style
                   startIcon={<AddIcon />} // Add Icon here
                   sx={{ display: 'flex', alignItems: 'center' }} // Center the icon with the text
                     >
                      {translate("add_inventory")} {/* Title next to the icon */}
                </Button>
                <SelectInput
                  options={groupOptions}
                  placeholder={translate("select_group")}
                  height="40px"
                />
                <SelectInput
                  options={modifierOptions}
                  placeholder={translate("select_modifier")}
                  height="40px"
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
