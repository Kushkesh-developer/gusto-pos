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


























const generateZodSchema = (translate) => {
  return z.object({
    currencyName: z.string().min(1, { message: translate('currency_name_required') }),
    currency: z.string().min(1, { message: translate('currency_required') }),
    symbol: z.string().min(1, { message: translate('symbol_required') }),
    status1: z.boolean()
  });
};

function CurrencyDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      currencyName: '',
      currency: '',
      symbol: ''
    }
  });

  // Populate the form when editData changes
  // Populate the form when editData changes
  useEffect(() => {
    if (edit) {
      console.log('edit if', edit);

      reset({
        currencyName: edit.currencyName || '',
        currency: edit.currency || '',
        symbol: edit.symbol || ''
      });
    } else {
      console.log('edit else', edit);
      reset({
        currencyName: '',
        currency: '',
        symbol: ''
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
      symbol: ''
    });
    setEdit(null);
    onClose();
  };
  const handleDrawerClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    handleClose();
  };
  return (
    <Drawer
      open={open}
      onClose={handleDrawerClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2
        }
      }}>

      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} />
      <Box mb={5}>
        <FormLayout cardHeading={formTitle}>
          <Controller
            name="currencyName"
            control={control}
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('currency_name')}
              error={Boolean(errors.currencyName?.message)}
              helperText={errors.currencyName?.message}
              placeholder={translate('currency_name')} />

            } />

          <Controller
            name="currency"
            control={control}
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('currency_code')}
              error={Boolean(errors.currency?.message)}
              helperText={errors.currency?.message}
              placeholder={translate('currency_code')} />

            } />

          <Controller
            name="symbol"
            control={control}
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('symbol')}
              error={Boolean(errors.symbol?.message)}
              helperText={errors.symbol?.message}
              placeholder={translate('symbol')} />

            } />

        </FormLayout>
      </Box>
      <Box
        sx={{
          display: 'flex',
          minWidth: '100%',
          justifyContent: 'flex-end',
          mt: 2
        }}>

        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={handleClose}>
          {translate('cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}>

          {translate('save')}
        </Button>
      </Box>
    </Drawer>);

}

export default CurrencyDrawer;