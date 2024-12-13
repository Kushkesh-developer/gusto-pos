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
<<<<<<< HEAD
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';
=======
import { useDrawerContext } from '@/context/DrawerProvider';
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea

const generateZodSchema = (translate) => {
  return z.object({
    name: z.string().min(1, translate('name_is_required')),
<<<<<<< HEAD
    address: z.string().min(1, translate('address_is_required')),
    postal: z.string().min(1, translate('postal_is_required')),
=======
    printername: z.string().min(1, translate('printer_name_is_required')),
    printerIPAddress: z.string().min(1, translate('Ip_address_is_required')),
    printerModel: z.string().min(1, translate('printer_model_is_required')),
    printerType: z.string().min(1, translate('printer_type_is_required')),
    receiptQuantity: z.string().min(1, translate('receipt_quantity_is_required')),
    printReceiptAndBills: z.record(z.boolean()),
    printOrders: z.record(z.boolean()),
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
  });
};

export default function OutletDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.name || '',
      printerName: '',
      address: '',
      postal: '',
      printerType: '',
      receiptQuantity: '',
      printReceiptAndBills: false,
      printOrders: false,
    },
  });
  useEffect(() => {
    reset({
      name: edit?.name || '',
<<<<<<< HEAD
      address: edit?.address || '',
      postal: edit?.postal || '',
=======
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
    });
  }, [edit, reset]);
  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  const handleClose = () => {
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('outlet_details')}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('name')}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
                placeholder={translate('name')}
              />
            )}
          />

          <Controller
            control={control}
<<<<<<< HEAD
            name="address"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('address')}
                helperText={errors.address?.message}
                error={Boolean(errors.address)}
                placeholder={translate('address')}
=======
            name="printerName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('printer_name')}
                helperText={errors.printerName?.message}
                error={Boolean(errors.printerName)}
                placeholder={translate('printer_name')}
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
              />
            )}
          />

          <Controller
            name="postal"
            control={control}
<<<<<<< HEAD
            render={({ field }) => (
              <GSNumberInput
                {...field}
                label={translate('postal')}
                placeholder={translate('postal')}
                helperText={errors.postal?.message}
                error={Boolean(errors.postal)}
                startAdornment={'L£'}
=======
            name="printerIPAddress"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('printer_ip_address')}
                helperText={errors.printerIPAddress?.message}
                error={Boolean(errors.printerIPAddress)}
                placeholder={translate('printer_ip_address')}
              />
            )}
          />

          <Controller
            control={control}
            name="printerModel"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('printer_model')}
                helperText={errors.printerModel?.message}
                error={Boolean(errors.printerModel)}
                placeholder={translate('printer_model')}
              />
            )}
          />

          <Controller
            control={control}
            name="printerType"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('printer_type')}
                helperText={errors.printerType?.message}
                error={Boolean(errors.printerType)}
                placeholder={translate('printer_type')}
              />
            )}
          />

          <Controller
            control={control}
            name="receiptQuantity"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('receipt_code')}
                helperText={errors.receiptQuantity?.message}
                error={Boolean(errors.receiptQuantity)}
                placeholder={translate('receipt_code')}
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
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
