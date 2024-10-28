
import DeliveryLocationForm from "@/components/delivery/DeliveryLocationForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
export default function DeliveryLocation() {
  const{translate}=useLocalization()
  return (
    <Box p={3}>
      <PageHeader title={translate("delivery_location")} hideSearch={true} />
      <DeliveryLocationForm
      />
       </Box>
  );
}
