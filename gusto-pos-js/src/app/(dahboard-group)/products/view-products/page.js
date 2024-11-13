"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";

import { useLocalization } from "@/context/LocalizationProvider";
import { productsData } from "@/mock/products";
import PageHeader from "@/components/widgets/headers/PageHeader";

// Mock data

const Page = () => {
  const { translate } = useLocalization();

  const [response] = useState(productsData);
  const [filteredColumns, setFilteredColumns] = useState(productsData);
  const [searchQuery, setSearchQuery] = useState("");
  const columnNames = [
  { label: "Product Name", key: "Product Name", visible: true },
  { label: "Order", key: "Order", visible: true },
  { label: "Created Date", key: "Created Date", visible: true },
  {
    label: "Show on Web",
    key: "Show on Web",
    visible: true,
    type: "toggle"
  },
  {
    label: "Action",
    key: "action",
    visible: true,
    isAction: true,
    actions: [
    {
      type: "edit",
      // eslint-disable-next-line no-console
      handler: (id) => handleEdit(id)
    },
    {
      type: "delete",
      // eslint-disable-next-line no-console
      handler: (id) => handleDelete(id)
    }]

  }];


  // Delete function
  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) =>
    prevUsers.filter((user) => user.id !== id)
    );
  };
  const handleEdit = (id) => {
    // eslint-disable-next-line no-console
    console.log("Edit user with ID:", id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users =
      `${user["Product Name"]} ${user["Created Date"]} ${user.Order} `.toLowerCase();

      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("view_product")} />

      <Box style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate("add_view_product")}
          showFilter
          href="/products/add-product-items"
          currentItems={currentItems} />

      </Box>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns} />

    </Box>);

};

export default Page;