"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, Box} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import ModifierGroupDrawer from "@/components/modifier/ModifierGroupDrawer";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import { modifierGroupMock } from "@/mock/modifier";
const columnNames: ColumnType[] = [
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
const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(modifierGroupMock);
  const [filteredUsers, setFilteredUsers] = useState(modifierGroupMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
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
      const item = `${items.group}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("view_modifier_group")}
      </Typography>
      <Divider />
      <ModifierGroupDrawer
                open={showUserDrawer}
                onClose={() => setShowUserDrawer(false)}
       />
      <Box style={{ marginTop: "15px" }}>
        
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle={translate("add_modifier_group")}
          customButtonAction={() => setShowUserDrawer(true)}
          showFilter
        />
      </Box>
      <GSTable
        columns={columns}
        filteredUsers={filteredUsers}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(
          columns.map((col) => [col.label, col.key]),
        )}
      />
    </Box>
  );
};

export default Page;
