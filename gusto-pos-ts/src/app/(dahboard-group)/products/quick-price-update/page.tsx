import QuickPriceUpdate from "@/components/product/QuickPriceUpdate";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

export default function QuickPricePage() {
  return (
    <Box p={3} sx={{minWidth:"90%"}}>
      <PageHeader title="Quick Price Update" hideSearch={true} />
           <QuickPriceUpdate />
    </Box>
  );
}
