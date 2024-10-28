"use client"
import AddDriverForm from "@/components/delivery/AddDriverForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
export default function AddCustomer() {
   const{translate}=useLocalization();
    return (
      <Box p={3}>
        <PageHeader title={translate("add_driver")} hideSearch={true} />
        <AddDriverForm/>
      </Box>
    );
  }
  
