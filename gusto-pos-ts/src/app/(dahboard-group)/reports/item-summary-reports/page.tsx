"use client";
import React, { useEffect, useState } from "react";
import {  Typography, Divider, useTheme} from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { useLocalization } from "@/context/LocalizationProvider";

// Example data structure
const FilterByOutlet = [
    { label: "Hot", value: "hot" },
    { label: "Cold", value: "cold" },
  ];
  
  const FilterByType = [
    { label: "Onion Ring", value: "onionRing" },
    { label: "Coleslaw", value: "coleslaw" },
  ];

const Page = () => {
    const { translate } = useLocalization();
    const mockResponse = [
        {
          itemName: "Burger Bun",
          Outlet: "chai chee",
          Qty: "100",
          Unit: "kg",
          MinQty: "1",
          MaxQty: "100",
          ItemType: "Raw Material",
        },
        {
          itemName: "Burger Bun",
          Outlet: "chai chee",
          Qty: "100",
          Unit: "kg",
          MinQty: "1",
          MaxQty: "100",
          ItemType: "Raw Material",
        },
        // Add more mock data if needed
      ];
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [response] = useState(mockResponse);
    const [filteredUsers, setFilteredUsers] = useState(mockResponse);
    const [searchQuery, setSearchQuery] = useState("");
    const theme = useTheme();
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State for column visibility
  const [columnVisibility, setColumnVisibility] = useState({
    itemName: true,
    Outlet: true,
    Qty: true,
    Unit: true,
    MinQty: true,
    MaxQty: true,
    ItemType: true,
  });

  // Define the column names based on the mock data
  type ColumnName = "itemName" | "Outlet" | "Qty" | "Unit" | "MinQty" | "MaxQty" | "ItemType";

  // Function to check if a column name is valid
  const isColumnName = (name: string): name is ColumnName => {
    return ["itemName", "Outlet", "Qty", "Unit", "MinQty", "MaxQty", "ItemType"].includes(name);
  };
    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mockResponse.slice(indexOfFirstItem, indexOfLastItem);
    const columnNames = ["itemName", "Outlet", "Qty", "Unit", "MinQty", "MaxQty", "ItemType"];
    const totalPages = Math.ceil(mockResponse.length / itemsPerPage);
  

  // Function to toggle column visibility
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
    const sanitizedSearch = searchQuery.toLowerCase().trim();
    const filteredRows = mockResponse.filter((item) => {
      const fieldsToSearch = `${item.itemName} ${item.Outlet} ${item.Qty} ${item.Unit} ${item.MinQty} ${item.MaxQty} ${item.ItemType}`.toLowerCase();
      return fieldsToSearch.includes(sanitizedSearch);
    });
    setFilteredUsers(filteredRows);
  }, [searchQuery]);

  return (
    <div style={{padding:"24px"}} >
            <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
            Item Summary Reports
      </Typography>
      <Divider />
      
      <div style={{marginTop:"15px"}}>
      <GSTableControls
        setSearchQuery={setSearchQuery}
         renderFilterElement={
            <div style={{ display: "flex", gap: "15px" }}>
            <SelectInput
              options={FilterByOutlet}
              placeholder={translate("FilterByOutlet")}
              height="40px"
              sx={{ width: "auto" }} // Slightly shrink the width
            />
            <SelectInput
              options={FilterByType}
              placeholder={translate("FilterByType")}
              height="40px"
              sx={{ width: "auto", marginRight: "15px" }} // Slightly shrink the width and apply margin-right
            />
          </div>
          
          }
        columnNames={columnNames}
        columnVisibility={columnVisibility}
        toggleColumnVisibility={toggleColumnVisibility}
        // TableTitle="Add new Item"
        showPrint
        showExcel
        showPdf
        showFilter
        // href="/reports/add-item-summary"
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
            itemName : "itemName",
          Outlet: "Outlet",
          Qty: "Qty",
          Unit: "Unit",
          MinQty: "MinQty",
          MaxQty:"MaxQty",
          ItemType:"ItemType"
        }}// Adjust key mapping if needed
       
      />
     </div>
  );
};

export default Page;
