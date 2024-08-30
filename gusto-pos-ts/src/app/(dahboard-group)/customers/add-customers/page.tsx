"use-client";

import CustomerForm from "@/components/Customer/CustomerForm";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box, Stack, Typography, Divider } from "@mui/material";
// import PageLoader from "next/dist/client/page-loader";
import React from "react";

export default function Home() {
  return (
    <>
      <PageHeader title={"Add Customer"} hideSearch={true} />
      <CustomerForm />
    </>
  );
}
