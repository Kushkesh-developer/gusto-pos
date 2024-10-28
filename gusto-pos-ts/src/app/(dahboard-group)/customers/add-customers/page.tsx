import CustomerForm from "@/components/customer/CustomerForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
export default function AddCustomer() {
  const {translate}=useLocalization();
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("add_customer")} hideSearch={true} />
      <CustomerForm />
    </Box>
  );
}
