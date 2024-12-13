import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import dayjs from 'dayjs';

import { Button } from '@mui/material';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';

<<<<<<< HEAD
=======
import { useDrawerContext } from '@/context/DrawerProvider';

>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
const generateZodSchema = (translate) => {
  return z.object({
    name: z.string().min(1, { message: translate('name_is_required') }),
    adsProvidername: z.string().min(1, { message: translate('provider_name_is_required') }),
    refreshrate: z.string().min(1, { message: translate('refresh_rate_is_required') }),
    status: z.string().min(1, { message: translate('status_is_required') }),
  });
};

export default function CdsDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      adsProviderName: '',
      refreshRate: '',
      logoImage: '',
      status: '',
      validFromDate: dayjs(),
      validToDate: dayjs(),
    },
  });

  // Watch the logo_image field
  const logoImage = watch('logoImage');

  // Update form when edit data changes

  useEffect(() => {
    // Reset the form and ensure the logoImage is populated with edit data if available
    reset({
      name: edit?.name ?? '',
      adsProviderName: edit?.adsProviderName ?? '',
      status: edit?.status ?? '',
      logoImage: edit?.logoImage ?? '', // Make sure to set the logoImage here
    });
  }, [edit, reset]);
  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
        setValue('logoImage', imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setValue('logoImage', '');
  };

  // Form submission handler
  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    // Optionally close drawer after submission
  };

  // Close drawer handler
  const handleClose = () => {
    setEdit(null);
    onClose();
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
        <FormLayout cardHeading="Provider Details">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('name')}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
                placeholder="Enter Name"
              />
            )}
          />

          <Controller
            control={control}
            name="adsProviderName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('ads_provider_name')}
                helperText={errors.adsProviderName?.message}
                error={Boolean(errors.adsProviderName)}
                placeholder="Enter Provider Name"
              />
            )}
          />

          <Controller
            name="validFromDate"
            control={control}
            render={({ field }) => (
              <GSDateInput
                id="valid_from_date"
                {...field}
                label={translate('valid_from_date')}
                value={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />

          <Controller
            name="validToDate"
            control={control}
            render={({ field }) => (
              <GSDateInput
                id="valid_to_date"
                {...field}
                label={translate('valid_to_date')}
                value={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />

          <Controller
            control={control}
            name="refreshRate"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('refresh_rate')}
                helperText={errors.refreshRate?.message}
                error={Boolean(errors.refreshRate)}
                placeholder="Enter Refresh Rate"
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('status')}
                options={[
                  { value: 'waiting', label: translate('waiting') },
                  { value: 'pending', label: translate('pending') },
                  { value: 'cancelled', label: translate('cancelled') },
                  { value: 'active', label: translate('active') },
                  { value: 'other', label: translate('other') },
                ]}
                placeholder={translate('select_status')}
                helperText={errors.status?.message}
                error={Boolean(errors.status)}
              />
            )}
          />

          <GSCustomStackLayout withoutGrid>
            <GSImageUpload
              name="logoImage"
              selectedImg={logoImage}
              onClick={handleRemoveImage}
              quantity={false}
              category={false}
              onChange={handleImageUpload}
            />
          </GSCustomStackLayout>
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
        <Button variant="outlined" sx={{ minWidth: 120 }} onClick={handleClose}>
          {translate('cancel')}
        </Button>
        <Button variant="contained" sx={{ minWidth: 120, ml: 2 }} onClick={handleSubmit(onSubmit)}>
          {translate('save')}
        </Button>
      </Box>
    </Drawer>
  );
}
