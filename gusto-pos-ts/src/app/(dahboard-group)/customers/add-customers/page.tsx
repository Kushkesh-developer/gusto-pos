import CustomerForm from "@/components/customer/CustomerForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

export default function AddCustomer() {
  return (
    <Box p={3}>
      <PageHeader title="Add Customer" hideSearch={true} />
      <CustomerForm />
    </Box>
  );
}
