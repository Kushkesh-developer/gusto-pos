'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import Drawer from '@mui/material/Drawer';

import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';

const generateZodSchema = (translate) => {
  return z.object({
    currencyName: z.string().min(1, { message: translate('currency_name_required') }),
    currency: z.string().min(1, { message: translate('currency_required') }),
    icon: z.string().min(1, { message: translate('icon_required') }),
    status1: z.boolean(),
  });
};

function CurrencyDrawer({ open, onClose, formTitle, edit, setEdit }) {
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
      currencyName: '',
      currency: '',
      icon: '',
      status1: false,
    },
  });

  // Populate the form when editData changes
  // Populate the form when editData changes
  useEffect(() => {
    if (edit) {
      reset({
        currencyName: edit.currencyName || '',
        currency: edit.currency || '',
        icon: edit.icon || '',
        status1: edit.status1 ?? false, // Use nullish coalescing to handle undefined
      });
    } else {
      reset({
        currencyName: '',
        currency: '',
        icon: '',
        status1: false,
      });
    }
  }, [edit, reset]);

  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    console.log(data);
  };

  const handleClose = () => {
    reset({
      currencyName: '',
      currency: '',
      icon: '',
      status1: false,
    });
    setEdit(null);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2,
        },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} showMobileView={true} />
      <Box mb={5}>
        <FormLayout cardHeading={formTitle}>
          <Controller
            name="currencyName"
            control={control}
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('currency_name')}
                error={Boolean(errors.currencyName?.message)}
                helperText={errors.currencyName?.message}
                placeholder={translate('currency_name')}
              />
            )}
          />

          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('currency')}
                error={Boolean(errors.currency?.message)}
                helperText={errors.currency?.message}
                placeholder={translate('currency')}
              />
            )}
          />

          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('icon')}
                error={Boolean(errors.icon?.message)}
                helperText={errors.icon?.message}
                placeholder={translate('icon')}
              />
            )}
          />

          <Controller
            name="status1"
            control={control}
            render={({ field }) => (
              <GSSwitchButton
                {...field}
                checked={field.value} // Ensure the checked state is bound
                onChange={(e) => {
                  // Cast e.target to HTMLInputElement to access the 'checked' property
                  const target = e.target;
                  field.onChange(target.checked);
                }}
                label={translate('status')}
                labelPlacement="start"
                sx={{
                  display: 'block',
                  marginTop: '20px !important',
                  marginLeft: 0,
                }}
              />
            )}
          />
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

export default CurrencyDrawer;
