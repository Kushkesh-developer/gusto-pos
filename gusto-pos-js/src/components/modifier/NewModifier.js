import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';

import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { Button } from '@mui/material';

import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
import { outlets } from '@/mock/common';
























const generateZodSchema = (translate) => {
  return z.object({
    name: z.string().min(1, translate('name_is_required')),
    groups: z.string().min(1, translate('selecting_groups_is_mandatory')),
    outlet: z.string().min(1, translate('selecting_location_is_mandatory')),
    cost: z.string().min(1, translate('cost_is_required'))
  });
};

export default function NewModifier({ open, onClose, formTitle, edit, setEdit }) {
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
      groups: '',
      name: '',
      outlet: '',
      cost: ''
    }
  });

  // Reset form when the `edit` data changes
  useEffect(() => {
    reset({
      groups: edit?.groups || '',
      name: '',
      outlet: edit?.outlet || '',
      cost: edit?.cost || ''
    });
  }, [edit, reset]);

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const handleClose = () => {
    reset({
      groups: '',
      name: '',
      outlet: '',
      cost: ''
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
        <FormLayout cardHeading={translate('modifier_details')}>
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
            name="groups"
            render={({ field }) =>
            <GSSelectInput
              {...field}
              requiredMark
              label={translate('groups')}
              options={[
              { value: 'hot', label: 'hot' },
              { value: 'cold', label: 'cold' }]
              }
              helperText={errors.groups?.message}
              error={Boolean(errors.groups)}
              placeholder={translate('select_the_group')} />

            } />

          <Controller
            control={control}
            name="outlet"
            render={({ field }) =>
            <GSSelectInput
              {...field}
              requiredMark
              label={translate('outlet')}
              options={[{ label: translate('select_outlet'), value: '' }, ...outlets]}
              helperText={errors.outlet?.message}
              error={Boolean(errors.outlet)}
              placeholder={translate('select_the_outlet')} />

            } />

          <Controller
            control={control}
            name="cost"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('cost')}
              helperText={errors.cost?.message}
              error={Boolean(errors.cost)}
              placeholder={translate('enter_cost')} />

            } />

        </FormLayout>
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
      </Box>
    </Drawer>);

}