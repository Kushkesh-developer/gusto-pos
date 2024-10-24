import QuickDiscountUpdate from "@/components/product/QuickDiscountUpdate";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

export default function QuickDiscountPage() {
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title="Quick Discount Update" hideSearch={true} />
      <QuickDiscountUpdate />
    </Box>
  );
}
