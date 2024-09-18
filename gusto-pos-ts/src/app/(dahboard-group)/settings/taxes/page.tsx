"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";

const floorOptions = [
  { label: "One", value: "One" },
  { label: "Two", value: "Two" },
];

const outletsOptions = [
  { label: "Outlet 1", value: "outlet1" },
  { label: "Outlet 2", value: "outlet2" },
];
const Page = () => {
  const { translate } = useLocalization();

  // Mock data
  const mockResponse = [
    { name: "GST", taxRate: "7%", "on/off": <GSSwitchButton /> },
    { name: "Service Charge", taxRate: "10%", "on/off": <GSSwitchButton /> },
    // Add more mock data as needed
  ];

  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const columnNames = [
    { label: "Name", key: "name", visible: true },
    { label: "Tax Rate", key: "taxRate", visible: true },
    { label: "On / Off", key: "on/off", visible: true },
    { label: "Action", key: "action", visible: true, isAction: true },
  ];
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.name} ${user.taxRate}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        Taxes
      </Typography>
      <Divider />
      <Box mt={"40px"}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add Table"
          showPrint
          showExcel
          showPdf
          showFilter
          href="/staff/add-staff"
          renderFilterElement={
            <Box
              display="flex"
              gap="10px"
              justifyContent="end"
              pb="10px"
              width="100%"
            >
              <SelectInput
                options={floorOptions}
                placeholder={translate("select_floor")}
                height="40px"
              />
              <SelectInput
                options={outletsOptions}
                placeholder={translate("select_outlets")}
                height="40px"
              />
            </Box>
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
