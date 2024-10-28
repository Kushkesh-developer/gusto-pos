import AddSupplier from "@/components/supplier/AddSupplier";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
const page = () => {
  const {translate}=useLocalization()
  return (
    <Box p={3}>
      <PageHeader title={translate("add_supplier")} hideSearch={true} />
      <AddSupplier />
    </Box>
  );
};

export default page;
