import RolesAndPermissionForm from "@/components/staff/RolesAndPermissionForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title="Add Roles & Permission" hideSearch={true} />
      <RolesAndPermissionForm />
    </Box>
  );
};

export default page;
