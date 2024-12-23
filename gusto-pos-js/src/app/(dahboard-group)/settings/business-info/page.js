import BusinessInfo from '@/components/settings/BusinessInfo';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { Box } from '@mui/material';
import React from 'react';

const Page = () => {
  return (
    <Box p={3}>
      <PageHeader title="Business Info" hideSearch={true} />
      <BusinessInfo />
    </Box>
  );
};

export default Page;
