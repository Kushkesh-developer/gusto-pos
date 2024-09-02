import AddSupplier from "@/components/supplier/AddSupplier";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <Box p={3}>
      <PageHeader title="Add Supplier" hideSearch={true} />
      <AddSupplier />
    </Box>
  );
};

export default page;
