"use client";
import DiscountForm from "@/components/discount/DiscountForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
export default function AddCustomer() {
  const { translate } = useLocalization();
  return (
    <Box p={3}>
      <PageHeader title={translate("add_discount_options")} hideSearch={true} />
      <DiscountForm />
    </Box>);

}