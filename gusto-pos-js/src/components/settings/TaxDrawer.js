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

const generateZodSchema = (translate) => {
  return z.object({
    taxName: z.string().min(1, translate('tax_name_is_required')),
    taxRate: z.string().min(1, translate('tax_rate_is_must')),
=======
import { useDrawerContext } from '@/context/DrawerProvider';

const generateZodSchema = (translate) => {
  return z.object({
    taxname: z.string().min(1, translate('tax_name_is_required')),
    taxrate: z.string().min(1, translate('tax_rate_is_must')),
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
  });
};
export default function TerminalDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
<<<<<<< HEAD
  const defaultValues = {
    taxName: '',
    taxRate: '',
  };
=======
  const { drawerPosition } = useDrawerContext();
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
<<<<<<< HEAD
    defaultValues: defaultValues,
=======
    defaultValues: {
      taxName: edit?.taxName || '',
      taxRate: '',
    },
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
  });
  console.log('errors==>', errors);
  useEffect(() => {
<<<<<<< HEAD
    if (edit) {
      reset({
        ...defaultValues,
        taxName: formTitle === translate('edit_new_tax') ? (edit?.taxName ?? '') : '',
        // gender: edit?.gender || 'Male',
        taxRate: edit?.taxRate || '',
      });
    } else {
      reset({
        ...defaultValues,
      });
    }
=======
    reset({
      taxName: formTitle === translate('edit_new_tax') ? (edit?.taxName ?? '') : '',
      // gender: edit?.gender || 'Male',
      taxRate: edit?.taxRate || '',
    });
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
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
        <FormLayout cardHeading={translate('tax_details')}>
          <Controller
            control={control}
            name="taxName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('tax_name')}
                helperText={errors.taxName?.message}
                error={Boolean(errors.taxName)}
                placeholder={translate('tax_name')}
              />
            )}
          />

          <Controller
            control={control}
            name="taxRate"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('tax_rate')}
                helperText={errors.taxRate?.message}
                error={Boolean(errors.taxRate)}
                placeholder={translate('tax_rate')}
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
