import DiscountForm from "@/components/discount/DiscountForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

export default function AddCustomer() {
  return (
    <Box p={3}>
      <PageHeader title="Add discount option" hideSearch={true} />
      <DiscountForm />
    </Box>
  );
}
