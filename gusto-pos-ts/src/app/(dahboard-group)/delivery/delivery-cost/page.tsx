"use client"
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import DeliveryCostForm from "@/components/delivery/DeliveryCostForm";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
export default function DeliveryCost() {
  const{translate}=useLocalization()
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("delivery_cost")} hideSearch={true} />
      <DeliveryCostForm />
    </Box>
  );
}
