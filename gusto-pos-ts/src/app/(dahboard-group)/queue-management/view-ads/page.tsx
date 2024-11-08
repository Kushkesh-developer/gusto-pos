"use client";
import React, { useEffect, useState } from "react";
import {  Box, Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import { ColumnType } from "@/types/table-types";
import { floorOptions, outletsOptions, adsMock } from "@/mock/queue";
import CdsDrawer from "@/components/queue-management/CdsDrawer";
import PageHeader from "@/components/widgets/headers/PageHeader";

const Page = () => {
  const { translate } = useLocalization();
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [response] = useState(adsMock);
  const [filteredUsers, setFilteredUsers] = useState(adsMock);
  const [searchQuery, setSearchQuery] = useState("");

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
    { label: "Image", key: "image", visible: true,type:"image" },
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
          handler: (id) => handleDelete(id)
        },
      ],
    },

  ];
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
    setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData =
        `${user.order} ${user.Name} ${user.status}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("queue_ads")} />

      <Box mt={"40px"}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <SelectInput
                options={floorOptions}
                placeholder={translate("select_floor")}
                height="40px"
                variant="theme"  // Pass type as "theme" to enable primary color styling
                placeholderColor="primary"  // Ensures placeholder text color is primary
                
              />
              <SelectInput
                options={outletsOptions}
                placeholder={translate("select_outlets")}
                height="40px"
                variant="theme"  // Pass type as "theme" to enable primary color styling
                placeholderColor="primary"  // Ensures placeholder text color is primary
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
      />
      <Box mt={"50px"}>
        <PageHeader title={translate("waiting_list")} />
        <CdsDrawer
          open={showUserDrawer}
          onClose={() => setShowUserDrawer(false)}
        />
        <Box mt={"40px"}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            tableTitle={translate("add_ads")}
            showFilter
            customButtonAction={() => setShowUserDrawer(true)}
            currentItems={currentItems}
            renderFilterElement={
              <Stack direction="row"  spacing={2}>
                <SelectInput
                  options={floorOptions}
                  placeholder={translate("select_floor")}
                  height="40px"
                  variant="theme"  // Pass type as "theme" to enable primary color styling
                  placeholderColor="primary"  // Ensures placeholder text color is primary
                />
                <SelectInput
                  options={outletsOptions}
                  placeholder={translate("select_outlets")}
                  height="40px"
                  variant="theme"  // Pass type as "theme" to enable primary color styling
                  placeholderColor="primary"  // Ensures placeholder text color is primary
                 
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
    </Box>
  );
};

export default Page;
