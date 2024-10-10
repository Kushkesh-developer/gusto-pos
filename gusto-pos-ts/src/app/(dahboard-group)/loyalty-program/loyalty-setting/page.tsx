import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import LoyaltyProgramSetting from "@/components/loyalty-program/LoyaltyProgramSetting";
const page = () => {
  return (
    <Box p={3}>
      <PageHeader title="Loyalty Program Setting" hideSearch={true} />
      <LoyaltyProgramSetting />
    </Box>
  );
};

export default page;
