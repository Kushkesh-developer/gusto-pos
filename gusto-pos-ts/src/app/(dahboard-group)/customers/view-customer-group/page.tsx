"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, useTheme } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
const Page = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // Mock data
  const mockResponse = [
    {
      customerGroup: "Group A",
    },
    {
      customerGroup: "Group B",
    },
  ];

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
  const columnNames = ["CustomerGroup", "Action"];
  const [columnVisibility, setColumnVisibility] = useState({
    CustomerGroup: true,
    Action: true,
  });

  type ColumnName = "CustomerGroup" | "Action";

  const isColumnName = (name: string): name is ColumnName => {
    return ["CustomerGroup", "Action"].includes(name);
  };

  const toggleColumnVisibility = (columnName: string) => {
    if (isColumnName(columnName)) {
      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnName]: !prevVisibility[columnName],
      }));
    }
  };

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.customerGroup}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        Customer Group
      </Typography>
      <Divider />
      <div style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          columnNames={columnNames}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          TableTitle="Add new customer"
          //   showPrint
          //   showExcel
          //   showPdf
          href="/staff/add-customer-group"
        />
      </div>
      <GSTable
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        filteredUsers={filteredUsers}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={{
          CustomerGroup: "customerGroup",
        }} // Adjust key mapping if needed
      />
    </div>
  );
};

export default Page;
