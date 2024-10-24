import AddCustomerGroup from "@/components/customer/AddCustomerGroup";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

export default function AddCustomer() {
  return (
    <Box p={3} sx={{minWidth:"90%"}}>
      <PageHeader title="Add Customer Group" hideSearch={true} />
      <AddCustomerGroup />
    </Box>
  );
}
