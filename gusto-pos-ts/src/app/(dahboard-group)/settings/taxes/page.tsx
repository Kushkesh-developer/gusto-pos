"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box ,Button} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import { ColumnType } from "@/types/table-types";
import {floorOptions,outletsOptions,taxesMockResponse} from "@/mock/setting"
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import TaxDrawer from "@/components/settings/TaxDrawer";


const Page = () => {
  const { translate } = useLocalization();

  // Mock data
  

  const [response] = useState(taxesMockResponse);
  const [filteredUsers, setFilteredUsers] = useState(taxesMockResponse);
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
    { label: "Name", key: "name", visible: true },
    { label: "Tax Rate", key: "taxRate", visible: true },
    { label: "On / Off", key: "on/off", visible: true },
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
         {translate("taxes")}
      </Typography>
      <Divider />
      <TaxDrawer     
        open={showUserDrawer}
        onClose={() => setShowUserDrawer(false)}/>
      <Box mt={"40px"}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle= {translate("add_tax")} 
          showPrint
          showExcel
          showPdf
          showFilter
          customButtonAction={() => setShowUserDrawer(true)}
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
