'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';

import PageHeader from '../widgets/headers/PageHeader';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';

const singleTierConfig = {
  tier: 'membership_tier_1',
  fields: [
    { name: 'membership_name', labelKey: 'membership_name' },
    { name: 'minimum_point_to_redeem', labelKey: 'minimum_point_to_redeem' },
    { name: 'expiry_period', labelKey: 'expiry_period' },
    { name: 'unlock_accumulated', labelKey: 'unlock_accumulated' },
    { name: 'maximum_point', labelKey: 'maximum_point' },
    { name: '$1_spent_equal_to', labelKey: '$1_spent_equal_to' },
  ],
};

const generateZodSchema = (translate) => {
  return z.object({
    membership_name: z.string().min(1, { message: translate('membership_name_required') }),
    minimum_point_to_redeem: z
      .number()
      .min(1, { message: translate('minimum_point_to_redeem_required') }),
    expiry_period: z.string().min(1, { message: translate('expiry_period_required') }),
    unlock_accumulated: z.string().min(1, { message: translate('unlock_accumulated_required') }),
    maximum_point: z.number().min(1, { message: translate('maximum_point_required') }),
    $1_spent_equal_to: z.string().min(1, { message: translate('$1_spent_equal_to_required') }),
  });
};

function LoyaltyDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      membership_name: '',
      minimum_point_to_redeem: '',
      expiry_period: '',
      unlock_accumulated: '',
      maximum_point: '',
      $1_spent_equal_to: '',
    },
  });

  // Populate the form when editData changes
  useEffect(() => {
    if (edit) {
      // Populate form fields with the edit record data
      reset({
        membership_name: edit.membership_name || '',
        minimum_point_to_redeem: edit.minimum_point_to_redeem || '',
        expiry_period: edit.expiry_period || '',
        unlock_accumulated: edit.unlock_accumulated || '',
        maximum_point: edit.maximum_point || '',
        $1_spent_equal_to: edit.$1_spent_equal_to || '',
      });
    } else {
      // Reset form to blank values for Add mode
      reset({
        membership_name: '',
        minimum_point_to_redeem: '',
        expiry_period: '',
        unlock_accumulated: '',
        maximum_point: '',
        $1_spent_equal_to: '',
      });
    }
  }, [edit, reset]);

  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data);
  };
  const handleClose = () => {
    setEdit(null);
    onClose();
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} />
      <Box mb={5}>
        <FormLayout cardHeading={translate(singleTierConfig.tier)}>
          {singleTierConfig.fields.map(({ name, labelKey }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate(labelKey)}
                  error={Boolean(errors[name]?.message)}
                  helperText={errors[name]?.message}
                  placeholder={translate(labelKey)}
                />
              )}
            />
          ))}
        </FormLayout>
      </Box>
      <Box
        sx={{
          display: 'flex',
          minWidth: '100%',
          justifyContent: 'flex-end',
          mt: 2,
        }}
      >
        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={handleClose}>
          {translate('cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          {translate('save')}
        </Button>
      </Box>
    </Drawer>
  );
}

export default LoyaltyDrawer;
