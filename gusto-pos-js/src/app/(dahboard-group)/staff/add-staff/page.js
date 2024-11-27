'use client';
import StaffForm from '@/components/staff/StaffForm';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { Box } from '@mui/material';
import React from 'react';
import { useLocalization } from '@/context/LocalizationProvider';
const Page = () => {
  const { translate } = useLocalization();
  return (
    <Box p={3}>
      <PageHeader title={translate('add_staff')} hideSearch={true} />
      <StaffForm />
    </Box>);

};

export default Page;