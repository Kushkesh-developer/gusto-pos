import AddCustomerGroup from "@/components/customer/AddCustomerGroup";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

export default function AddCustomer() {
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title="Add Customer Group" hideSearch={true} />
      <AddCustomerGroup />
    </Box>
  );
}
