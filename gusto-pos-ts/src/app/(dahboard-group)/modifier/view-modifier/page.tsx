"use client";
import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { ColumnType } from "@/types/table-types";
import { groupOptions, modifierOptions, modifierMock } from "@/mock/modifier";
import NewModifier from "@/components/modifier/NewModifier";
import PageHeader from "@/components/widgets/headers/PageHeader";

// Centralized column configuration

const Page = () => {
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
  const { translate } = useLocalization();
  const [response] = useState(modifierMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(modifierMock);
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
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("view_modifier")} />
      <NewModifier
        open={showUserDrawer}
        onClose={() => setShowUserDrawer(false)}
      />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate("add_modifier")}
          showFilter
          customButtonAction={() => setShowUserDrawer(true)}
          renderFilterElement={
            <Stack direction="row">
              <SelectInput
                options={groupOptions}
                placeholder={translate("filter_by_outlet")}
                height="40px"
                variant="theme"  // Pass type as "theme" to enable primary color styling
                placeholderColor="primary"  // Ensures placeholder text color is primary
                sx={{ mr: 2 }}
              />
              <SelectInput
                options={modifierOptions}
                placeholder={translate("filter_by_type")}
                height="40px"
                variant="theme" 
                placeholderColor="primary"

              />
            </Stack>
          }
          currentItems={currentItems}
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
          columns.map((col) => [col.label, col.key])
        )}
        setFilteredUsers={setFilteredUsers}
      />
    </Box>
  );
};

export default Page;
