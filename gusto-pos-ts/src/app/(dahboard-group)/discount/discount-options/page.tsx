"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, Stack,Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import { useLocalization } from "@/context/LocalizationProvider";
import { discountMock } from "@/mock/discount";
// import SelectInput from "@/components/widgets/inputs/GSSelectInput";
// import SelectInput from "@mui/material/Select/GSSelectInput";
import { ColumnType } from "@/types/table-types";


const Page = () => {
  const columnNames: ColumnType[] = [
    { label: "Name", key: "Name", visible: true },
    { label: "DiscountValue", key: "DiscountValue", visible: true },
    { label: "startDate", key: "startDate", visible: true },
    { label: "EndDate", key: "EndDate", visible: true },
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
          handler:(id) => handleDelete(id)
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
      prevUsers.filter((user) => user.id !== id)
    );
  };
  const { translate } = useLocalization();
  const [response] = useState(discountMock);
  const [filteredUsers, setFilteredUsers] = useState(discountMock);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filteredRows = response.filter((item) => {
      const itemName = `${item.Name}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return itemName.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  return (
    <Box  sx={{ flex: "1 1 auto", p: 3 }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
         {translate("discount_options")}
      </Typography>
      <Divider />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          TableTitle="Add Discount"
          href="/discount/add-discount-options"
          showPrint
          showExcel
          showPdf
          showFilter
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
          columns.map((col) => [col.label, col.key]),
        )}
        setFilteredUsers={setFilteredUsers}
      />
    </Box>
  );
};

export default Page;
