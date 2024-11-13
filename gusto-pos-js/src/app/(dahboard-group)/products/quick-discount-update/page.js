"use client";
import QuickDiscountUpdate from "@/components/product/QuickDiscountUpdate";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
export default function QuickDiscountPage() {
  const { translate } = useLocalization();
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader
        title={translate("quick_discount_update")}
        hideSearch={true} />

      <QuickDiscountUpdate />
    </Box>);

}