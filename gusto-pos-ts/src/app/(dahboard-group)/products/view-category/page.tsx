"use client";
import React, { useEffect, useState } from "react";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import { Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { ColumnType } from "@/types/table-types";
import { useLocalization } from "@/context/LocalizationProvider";
import { categoryMock } from "@/mock/products"
import PageHeader from "@/components/widgets/headers/PageHeader";



const Page = () => {
  const columnNames: ColumnType[] = [
    { label: "Category Name", key: "Category Name", visible: true },
    { label: "Order", key: "Order", visible: true },
    { label: "Image", key: "Image", visible: true },
    { label: "Created Date", key: "Created Date", visible: true },
    {
      label: "Show on Web",
      key: "Show on Web",
      visible: true,
      isToggle: true,
    },
    {
      label: "Show on POS",
      key: "Show on POS",
      visible: true,
      isToggle: true,
    },
    {
      label: "Action",
      key: "action",
      visible: true,
      isAction: true,
      actions: [
        {
          type: "edit",
          handler: (id) => handleEdit(id),
        },
        { type: "delete", handler: (id) => handleDelete(id) },
      ],
    },
  ];
  // const handleToggle = (id: number, key: string) => {
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item.id === id ? { ...item, [key]: !item[key] } : item
  //     )
  //   );
  // };
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
  const { translate } = useLocalization();
  const [response] = useState(categoryMock);
  const [data, setData] = useState(categoryMock);
  const [filteredUsers, setFilteredUsers] = useState(categoryMock);
  const [searchQuery, setSearchQuery] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users =
        `${user["Category Name"]} ${user["Created Date"]} ${user.Order} `.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("view_category")} />

      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle="Add new category"
          showPrint
          showExcel
          showPdf
          showFilter
          href="/products/add-category"
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
