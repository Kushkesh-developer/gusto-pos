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
import { useDrawerContext } from '@/context/DrawerProvider';

const generateZodSchema = (translate) => {
  return z.object({
    taxName: z.string().min(1, translate('tax_name_is_required')),
    taxRate: z.string().min(1, translate('tax_rate_is_must')),
  });
};
export default function TerminalDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const defaultValues = {
    taxName: '',
    taxRate: '',
  };
  const { drawerPosition } = useDrawerContext();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  console.log('errors==>', errors);
  useEffect(() => {
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
  }, [edit, reset]);
  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  const handleClose = () => {
    reset({
      ...defaultValues,
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
          p: 2,
        },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('tax_details')}>
          <Controller
            control={control}
            name="taxName"
            render={({ field }) => (
              <GSTextInput
                requiredMark
                {...field}
                label={translate('tax_name')}
                helperText={errors.taxName?.message}
                error={Boolean(errors.taxName)}
                placeholder={translate('enter_tax_name')}
              />
            )}
          />

          <Controller
            control={control}
            name="taxRate"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('tax_rate')}
                helperText={errors.taxRate?.message}
                error={Boolean(errors.taxRate)}
                placeholder={translate('enter_tax_rate')}
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
