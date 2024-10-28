"use client"
import QuickPriceUpdate from "@/components/product/QuickPriceUpdate";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
export default function QuickPricePage() {
  const{translate}=useLocalization()
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("quick_price_update")} hideSearch={true} />
      <QuickPriceUpdate />
    </Box>
  );
}
