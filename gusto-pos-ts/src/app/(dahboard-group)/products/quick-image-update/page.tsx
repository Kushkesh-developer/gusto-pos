"use client"
import QuickImageUpdate from "@/components/product/QuickImageUpdate";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
export default function QuickImagePage() {
  const{translate}=useLocalization()
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("quick_image_update")}hideSearch={true} />
      <QuickImageUpdate />
    </Box>
  );
}
