import StaffForm from "@/components/staff/StaffForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <Box p={3}>
      <PageHeader title="Add Staff" hideSearch={true} />
      <StaffForm />
    </Box>
  );
};

export default page;
