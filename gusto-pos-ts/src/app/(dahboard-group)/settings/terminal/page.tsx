"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box ,Stack,Button} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import TerminalDrawer from "@/components/settings/TerminalDrawer";
const Page = () => {
  const { translate } = useLocalization();
  // Mock data
  const mockResponse = [
    {
      terminalId: "1",
      terminalName: "Owner",
      outlets: "Chai Chee",
      status: "Activated",
    },
    {
      terminalId: "2",
      terminalName: "Cashier",
      outlets: "Chai Chee",
      status: "Not activated",
    },
    // Add more mock data as needed
  ];

  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // Pagination
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const columnNames: ColumnType[] = [
    { label: "Terminal Id", key: "terminalId", visible: true },
    { label: "Terminal Name", key: "terminalName", visible: true },
    { label: "Outlets", key: "outlets", visible: true },
    { label: "Status", key: "status", visible: true },
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
          handler: () => console.log("Delte"),
        },
      ],
    },
  ];
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData =
        `${user.terminalId} ${user.terminalName} ${user.status}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("pos_terminal")}
      </Typography>
      <Divider />
      <TerminalDrawer
         open={showUserDrawer}
         onClose={() => setShowUserDrawer(false)}   
      />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add New Terminal"
          showPrint
          showExcel
          showPdf
          showFilter
          renderFilterElement={
            <Stack  spacing={2} mr={2}> 
                <Button
                onClick={() => setShowUserDrawer(true)}
                variant="contained" // Optional: choose button style
               startIcon={<AddIcon />} // Add Icon here
               sx={{ display: 'flex', alignItems: 'center' }} // Center the icon with the text
             >
              {translate("add_terminal")} {/* Title next to the icon */}
           </Button>
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
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(
          columnNames.map((col) => [col.label, col.key]),
        )}
      />
    </Box>
  );
};

export default Page;
