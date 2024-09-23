"use client";
import React, { useEffect, useState } from "react";
import { Typography, Divider, Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
// import { useLocalization } from "@/context/LocalizationProvider";
import { mockResponse } from "@/mock/discount";
// import SelectInput from "@/components/widgets/inputs/GSSelectInput";
// import SelectInput from "@mui/material/Select/GSSelectInput";

const columnNames = [
    { label: "Name", key: "Name", visible: true },
    { label: "DiscountValue", key: "DiscountValue", visible: true },
    { label: "startDate", key: "startDate", visible: true },
    { label: "EndDate", key: "EndDate", visible: true },
    { label: "Action", key: "action", visible: true, isAction: true },
  ];

  const Page=()=>{
    const[response]= useState(mockResponse);
    const[filteredUsers,setFilteredUsers]=useState(mockResponse);
    const[searchQuery,setSearchQuery]=useState("");
    const[currentPage,setCurrentPage]=useState(1);
    const itemsPerPage=10;
  }