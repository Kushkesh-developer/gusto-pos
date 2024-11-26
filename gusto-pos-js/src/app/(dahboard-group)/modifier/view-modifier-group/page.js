"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";

import ModifierGroupDrawer from "@/components/modifier/ModifierGroupDrawer";

import { useLocalization } from "@/context/LocalizationProvider";
import { modifierGroupMock } from "@/mock/modifier";
import PageHeader from "@/components/widgets/headers/PageHeader";

const Page = () => {
  const columnNames = [
    { label: "Group", key: "group", visible: true },
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

  const handleEdit = (id) => {
    // eslint-disable-next-line no-console
    console.log("Edit user with ID:", id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id) => {
    // eslint-disable-next-line no-console
    console.log("Delete user with ID:", id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) =>
      prevUsers.filter((user) => user.id !== id),
    );
  };
  const { translate } = useLocalization();
  const [response] = useState(modifierGroupMock);
  const [filteredColumns, setFilteredColumns] = useState(modifierGroupMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  useEffect(() => {
    const filteredRows = response.filter((items) => {
      const item = `${items.group}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("view_modifier_group")} />

      <ModifierGroupDrawer
        open={showUserDrawer}
        onClose={() => setShowUserDrawer(false)}
      />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate("add_modifier_group")}
          customButtonAction={() => setShowUserDrawer(true)}
          showFilter
          currentItems={currentItems}
        />
      </Box>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(
          columns.map((col) => [col.label, col.key]),
        )}
        setFilteredColumns={setFilteredColumns}
      />
    </Box>
  );
};

export default Page;
