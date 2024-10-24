import QuickImageUpdate from "@/components/product/QuickImageUpdate";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

export default function QuickImagePage() {
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title="Quick Image Update" hideSearch={true} />
      <QuickImageUpdate />
    </Box>
  );
}
