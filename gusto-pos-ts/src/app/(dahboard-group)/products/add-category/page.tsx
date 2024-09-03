import AddCategory from "@/components/product/AddCategory";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import React from "react";

const Page = () => {
  return (
    <Box p={3}>
      <PageHeader title="Add Category" hideSearch={true} />
      <AddCategory />
    </Box>
  );
};

export default Page;
