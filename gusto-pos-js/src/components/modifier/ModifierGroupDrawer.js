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

const generateZodSchema = (translate) => {
  return z.object({
    groupName: z.string().min(1, translate('enter_group_name')),
  });
};

export default function NewModifierGroupDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      groupName: '',
    },
  });
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  useEffect(() => {
    reset({
      groupName: formTitle === 'Edit Modifier Group' ? (edit?.groupName ?? '') : '',
      // gender: edit?.gender || 'Male',
    });
  }, [edit, reset]);
  const handleClose = () => {
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
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
        <FormLayout cardHeading={translate('modifier_group')}>
          <Controller
            control={control}
            name="groupName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('group_name')}
                helperText={errors.groupName?.message}
                error={Boolean(errors.groupName)}
                placeholder={translate('enter_group_name')}
              />
            )}
          />
        </FormLayout>
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
      </Box>
    </Drawer>
  );
}
