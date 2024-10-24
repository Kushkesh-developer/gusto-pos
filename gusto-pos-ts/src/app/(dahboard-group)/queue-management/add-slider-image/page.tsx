import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import AddSlider from "@/components/queue-management/AddSlider";
const page = () => {
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title="Add new Ads" hideSearch={true} />
      <AddSlider />
    </Box>
  );
};

export default page;
