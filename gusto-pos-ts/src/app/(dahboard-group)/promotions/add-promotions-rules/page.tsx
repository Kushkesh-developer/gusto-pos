import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import PromotionForm from "@/components/promotions/PromotionForm";
const page = () => {
  return (
    <Box p={3}>
      <PageHeader title="Add Promotion Rules" hideSearch={true} />
      <PromotionForm />
    </Box>
  );
};

export default page;
