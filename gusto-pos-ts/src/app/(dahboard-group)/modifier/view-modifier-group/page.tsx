"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import { useLocalization } from "@/context/LocalizationProvider";

const Page = () => {
  const { translate } = useLocalization();
  const mockResponse = [
    {
      group: "Hot",
    },
    {
      group: "Cold",
    },
  ];

  const [response] = useState(mockResponse);
  const [filteredUsers, setFilteredUsers] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const columnNames = ["Group", "Action"];
  const [columnVisibility, setColumnVisibility] = useState({
    Group: true,
    Action: true,
  });

  const toggleColumnVisibility = (columnName: string) => {
    setColumnVisibility((prevVisibility: any) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  useEffect(() => {
    const filteredRows = response.filter((items) => {
      const item = `${items.group}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Modifier Group
      </Typography>
      <Divider />
      <div style={{ marginTop: "15px" }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          columnNames={columnNames}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          TableTitle="Add new modifier"
          href="/customers/add-customer"
          showFilter
        />
      </div>
      <GSTable
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        filteredUsers={filteredUsers}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={{
          Group: "group",
        }}
      />
    </div>
  );
};

export default Page;
