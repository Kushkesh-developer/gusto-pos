"use client";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
import AddSlider from "@/components/queue-management/AddSlider";
const Page = () => {
  const { translate } = useLocalization();
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("add_new_adds")} hideSearch={true} />
      <AddSlider />
    </Box>
  );
};

export default Page;
