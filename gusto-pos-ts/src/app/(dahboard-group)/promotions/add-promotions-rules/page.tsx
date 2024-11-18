'use client';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { Box } from '@mui/material';
import React from 'react';
import PromotionForm from '@/components/promotions/PromotionForm';
import { useLocalization } from '@/context/LocalizationProvider';
const Page = () => {
  const { translate } = useLocalization();
  return (
    <Box p={3}>
      <PageHeader title={translate('add_promotion_rules')} hideSearch={true} />
      <PromotionForm />
    </Box>
  );
};

export default Page;
