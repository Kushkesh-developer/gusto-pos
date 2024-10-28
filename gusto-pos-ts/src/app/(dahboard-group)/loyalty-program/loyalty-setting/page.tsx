"use client"
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
import LoyaltyProgramSetting from "@/components/loyalty-program/LoyaltyProgramSetting";
const page = () => {
  const{translate}=useLocalization()
  return (
    <Box p={3}>
      <PageHeader title={translate("loyalty_program_setting")} hideSearch={true} />
      <LoyaltyProgramSetting />
    </Box>
  );
};

export default page;
