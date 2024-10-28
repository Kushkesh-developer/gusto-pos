"use client"
import RolesAndPermissionForm from "@/components/staff/RolesAndPermissionForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";
const Page = () => {
  const {translate}=useLocalization()
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("add_role_permission")} hideSearch={true} />
      <RolesAndPermissionForm />
    </Box>
  );
};

export default Page;
