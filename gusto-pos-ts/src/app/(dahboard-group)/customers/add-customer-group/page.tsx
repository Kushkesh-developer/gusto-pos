import CustomerGroupForm from "@/components/customer/CustomerGropuForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <Box p={3}>
      <PageHeader title="Add Customer Group" hideSearch={true} />
      <CustomerGroupForm />
    </Box>
  );
};

export default page;
