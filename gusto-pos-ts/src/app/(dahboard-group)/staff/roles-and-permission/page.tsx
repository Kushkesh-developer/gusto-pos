"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import {rolesMock} from "@/mock/staff"
const Page = () => {
  const { translate } = useLocalization();
  // Mock data
  const handleEdit = (id: string) => {
    console.log("Edit user with ID:", id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    console.log("Delete user with ID:", id);
    // Filter out the user with the given ID
    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    );
  };

  const [response] = useState(rolesMock);
  const [filteredUsers, setFilteredUsers] = useState(rolesMock);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Centralized column configuration
  const columnNames: ColumnType[] = [
    { label: "Role", key: "role", visible: true },

    {
      label: "Action",
      key: "action",
      visible: true,
      isAction: true,
      actions:[
        { type:"edit",
           // eslint-disable-next-line no-console
         handler:(id)=>handleEdit(id)},
           // eslint-disable-next-line no-console
         {type:"delete",handler:(id)=>handleDelete(id)}
       ]
    },
  ];
  const [columns, setColumns] = useState(columnNames);

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.role}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

return (
    <Box  sx={{ flex: "1 1 auto", p: 3 }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        {translate("roles_and_permission")}
      </Typography>
      <Divider />
      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle="Add new roles"
          showPrint
          showExcel
          showPdf
          showFilter
          href="/staff/add-staff"
          currentItems={currentItems}
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
        setFilteredUsers={setFilteredUsers}
      />
    </Box>
  );
};

export default Page;
