"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { useLocalization } from "@/context/LocalizationProvider";
import { ColumnType } from "@/types/table-types";
import {
  floorOptions,
  outletsOptions,
  tablesmockResponse,
} from "@/mock/setting";
import TableDrawer from "@/components/settings/TableDrawer";
import PageHeader from "@/components/widgets/headers/PageHeader";

// Mock data

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(tablesmockResponse);
  const [filteredUsers, setFilteredUsers] = useState(tablesmockResponse);
  const [searchQuery, setSearchQuery] = useState("");

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
    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => user.terminalId !== id)
    );
  };
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
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("table_management")} />

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
      />
      <Box mt={"50px"}>
        <PageHeader title={translate("tables")} />
        <TableDrawer
          open={showUserDrawer}
          onClose={() => setShowUserDrawer(false)}
        />
        <Box mt={"40px"}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            TableTitle={translate("add_table")}
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
                  sx={{ mr: 2 }}
                />
                <SelectInput
                  options={outletsOptions}
                  placeholder={translate("select_outlets")}
                  sx={{ mr: 2 }}
                />
              </Box>
            }
            showPrint
            showExcel
            showPdf
            showFilter
            customButtonAction={() => setShowUserDrawer(true)}
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
            columnNames.map((col) => [col.label, col.key])
          )}
          setFilteredUsers={setFilteredUsers}
        />
      </Box>
    </Box>
  );
};

export default Page;
