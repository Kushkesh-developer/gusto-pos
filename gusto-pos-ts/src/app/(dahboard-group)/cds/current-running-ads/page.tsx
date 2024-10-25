"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Stack, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import { ColumnType } from "@/types/table-types";
import { outletsOptions, floorOptions, mockResponse } from "@/mock/cds";
import CdsDrawer from "@/components/cds/CdsDrawer";

const Page = () => {
  const { translate } = useLocalization();

  const [showUserDrawer, setShowUserDrawer] = useState(false);
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

  const columnNames: ColumnType[] = [
    { label: "Order", key: "order", visible: true },
    { label: "Name", key: "Name", visible: true },
    { label: "Image", key: "image", visible: true },
    { label: "Outlets", key: "outlets", visible: true },
    { label: "Start Date", key: "startDate", visible: true },
    { label: "End Date", key: "endDate", visible: true },
    { label: "Impression", key: "impression", visible: true },
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
          handler: (id) => handleEdit(id),
        },
        {
          type: "delete",
          // eslint-disable-next-line no-console
          handler: (id) => handleDelete(id),
        },
      ],
    },
  ];
  const [columns, setColumns] = useState(columnNames);
  const handleEdit = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log("Edit user with ID:", id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log("Delete user with ID:", id);
    // Filter out the user with the given ID
    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => user.order !== id)
    );
  };
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData =
        ` ${user.order} ${user.order} ${user.Name} ${user.status}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("current_running_ads")}
      </Typography>
      <Divider />
      <CdsDrawer
        open={showUserDrawer}
        onClose={() => setShowUserDrawer(false)}
      />
      <Box marginTop={2}>
        <GSTableControls
          tableTitle={translate("add_ads")}
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          customButtonAction={() => setShowUserDrawer(true)}
          currentItems={currentItems}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <SelectInput
                options={floorOptions}
                placeholder={translate("select_floor")}
                height="40px"
              />
              <SelectInput
                options={outletsOptions}
                placeholder={translate("select_outlets")}
                height="40px"
                 sx={{mr:2}}
              />
            </Stack>
          }
          showFilter
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
          columnNames.map((col) => [col.label, col.key])
        )}
        setFilteredUsers={setFilteredUsers}
      />{" "}
      <Typography
        variant="h4"
        gutterBottom
        color={theme.palette.primary.main}
        sx={{ marginTop: 4 }}
      >
        {translate("waiting_list")}
      </Typography>
      <Divider />
      <Box marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          showFilter
          showPrint
          showExcel
          showPdf
          currentItems={currentItems}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <SelectInput
                options={floorOptions}
                placeholder={translate("select_floor")}
                height="40px"
              />
              <SelectInput
                options={outletsOptions}
                placeholder={translate("select_outlets")}
                height="40px"
                sx={{ mr: 2 }}
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
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(
          columnNames.map((col) => [col.label, col.key])
        )}
        setFilteredUsers={setFilteredUsers}
      />
    </Box>
  );
};

export default Page;
