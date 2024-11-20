'use client';
import AccountForm from "@/components/settings/AccountForm";
import PageHeader from '@/components/widgets/headers/PageHeader';
import { Box } from '@mui/material';
import React from 'react';
import { useLocalization } from '@/context/LocalizationProvider';
export default function AddAccount() {
  const { translate } = useLocalization();
  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('add_account')} hideSearch={true} />
        <AccountForm/>
    </Box>
  );
}