import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';

import { Button } from '@mui/material';

import PageHeader from '@/components/widgets/headers/PageHeader';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';
import { useDrawerContext } from '@/context/DrawerProvider';

































const generateZodSchema = (translate) => {
  return z.object({
    outletId: z.string().min(1, translate('id_is_required')),
    name: z.string().min(1, translate('name_is_required')),
    address: z.string().min(1, translate('address_is_required')),
    postal: z.string().min(1, translate('postal_is_required')),
    phone: z.preprocess(
      (val) => val === '' || val == null ? undefined : Number(val),
      z.
      number({ invalid_type_error: translate('phone_number_is_required') }).
      min(1, { message: translate('phone_number_is_required') })
    )
  });
};

export default function OutletDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit
}) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      outletId: '',
      name: edit?.name || '',
      printerName: '',
      phone: 0,
      address: '',
      postal: '',
      printerType: '',
      receiptQuantity: '',
      printReceiptAndBills: false,
      printOrders: false
    }
  });
  useEffect(() => {
    reset({
      outletId: edit?.outletId || '',
      name: edit?.name || '',
      address: edit?.address || '',
      postal: edit?.postal || '',
      phone: edit?.phone || 0
    });
  }, [edit, reset]);
  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  const handleClose = () => {
    reset({
      outletId: edit?.outletId || '',
      name: edit?.name || '',
      address: edit?.address || '',
      postal: edit?.postal || '',
      phone: edit?.phone || 0
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
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
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2
        }
      }}>

      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('outlet_details')}>
          <Controller
            control={control}
            name="outletId"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('id')}
              helperText={errors.outletId?.message}
              error={Boolean(errors.outletId)}
              placeholder={translate('enter_id')} />

            } />

          <Controller
            control={control}
            name="name"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('name')}
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
              placeholder={translate('enter_name')} />

            } />

          <Controller
            control={control}
            name="address"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('address')}
              helperText={errors.address?.message}
              error={Boolean(errors.address)}
              placeholder={translate('enter_address')} />

            } />

          <Controller
            name="postal"
            control={control}
            render={({ field }) =>
            <GSNumberInput
              {...field}
              requiredMark
              label={translate('postal')}
              placeholder={translate('enter_postal')}
              helperText={errors.postal?.message}
              error={Boolean(errors.postal)} />

            } />

          <Controller
            control={control}
            name="phone"
            render={({ field: fieldProps }) =>
            <GSNumberInput
              requiredMark
              {...fieldProps}
              label={translate('phone_number')}
              helperText={errors.phone?.message}
              error={Boolean(errors.phone)}
              placeholder={translate('enter_phone_number')}
              value={fieldProps.value === 0 ? '' : String(fieldProps.value)} // Convert to string for display
              onChange={(e) => {
                const value = e.target.value;
                fieldProps.onChange(value === '' ? 0 : parseFloat(value)); // Convert back to number
              }} />

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