"use client";
import React, { useEffect, useState } from "react";
import {  Typography, Divider, useTheme} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
const Page = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // Mock data
  const mockResponse = [
    {
      "Company Name": "ABC Corporation",
      "Contact Person": "John Doe",
      Mobile: "+1234567890",
      Office: "+9876543210",
      Email: "john.doe@example.com",
      "Postal Code": "12345",
    },
    {
      "Company Name": "XYZ Enterprises",
      "Contact Person": "Jane Smith",
      Mobile: "+1987654321",
      Office: "+8765432109",
      Email: "jane.smith@example.com",
      "Postal Code": "54321",
    },
    {
      "Company Name": "PQR Industries",
      "Contact Person": "Alice Johnson",
      Mobile: "+1122334455",
      Office: "+9988776655",
      Email: "alice.johnson@example.com",
      "Postal Code": "67890",
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
  const columnNames = ["Company Name", "Contact Person", "Mobile", "Office", "Email","Postal Code","Action"];
  const [columnVisibility, setColumnVisibility] = useState({
    "Company Name": true,
    "Contact Person": true,
    Mobile: true,
    Office: true,
    Email: true,
    "Postal Code": true,
    Action: true,
  });
  type ColumnName = "Company Name" | "Contact Person" | "Mobile" | "Office" | "Email" | "Postal Code" | "Action";

  const isColumnName = (name: string): name is ColumnName => {
    return ["Company Name", "Contact Person", "Mobile", "Office", "Email","Postal Code" , "Action"].includes(name);
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
      const users = `${user["Company Name"]} ${user["Contact Person"]} ${user.Mobile} ${user.Office} ${user.Email}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery, response]);

 
  return (
    <div style={{padding:"24px"}} >
      <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
        View Supplier
      </Typography>
      <Divider />
      <div style={{marginTop:"15px"}}>
      <GSTableControls
        setSearchQuery={setSearchQuery}
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        toggleColumnVisibility={toggleColumnVisibility}
        TableTitle="Add new supplier"
        showPrint
        showExcel
        showPdf
        showFilter
        href="/staff/add-staff"
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
          "Company Name": "Company Name",
          "Contact Person": "Contact Person",
          Mobile: "Mobile",
          Office: "Office",
          Email: "Email",
          "Postal Code": "Postal Code",
        }}// Adjust key mapping if needed
       
      />

    </div>
  );
};

export default Page;
