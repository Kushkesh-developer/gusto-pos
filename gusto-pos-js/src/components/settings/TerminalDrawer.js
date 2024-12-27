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
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';

import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
import { outlets } from '@/mock/common';






























const generateZodSchema = (translate) => {
  return z.object({
    terminalId: z.string().min(1, translate('terminal_is_required')),
    terminalName: z.string().min(1, translate('terminal_name_is_required')),
    outlets: z.string().min(1, translate('outlet_is_required'))
  });
};

export default function TerminalDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit
}) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    terminalId: '',
    terminalName: '',
    outlets: ''
  };
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });
  useEffect(() => {
    console.log('hello', formTitle, edit?.username);
    if (edit) {
      reset({
        terminalId: edit?.terminalId || '',
        terminalName: edit?.terminalName || '',
        outlets: edit?.outlets || ' '
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
      ...defaultValues
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2
        }
      }}>

      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} showMobileView={true} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('terminal_details')}>
          <Controller
            control={control}
            name="terminalId"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              {...register('terminalId')}
              label={translate('terminal_id')}
              helperText={errors.terminalId?.message}
              error={Boolean(errors.terminalId)}
              placeholder={translate('terminal_id')} />

            } />

          <Controller
            control={control}
            name="terminalName"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('Terminal Name')}
              helperText={errors.terminalName?.message}
              error={Boolean(errors.terminalName)}
              placeholder={translate('terminal_name')} />

            } />

          <Controller
            control={control}
            name="outlets"
            render={({ field }) =>
            <GSSelectInput
              {...field}
              requiredMark
              options={outlets}
              label={translate('outlet')}
              helperText={errors.outlets?.message}
              error={Boolean(errors.outlets)}
              placeholder={translate('outlet')} />

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