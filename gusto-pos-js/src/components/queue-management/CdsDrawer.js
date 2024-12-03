import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
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

const generateZodSchema = (translate) => {
  return z.object({
    name: z.string().min(1, { message: translate('name_is_required') }), // Translated message
    adsProvidername: z.string().min(1, { message: translate('provider_name_is_required') }), // Translated message
    refreshrate: z.string().min(1, { message: translate('refresh_rate_is_required') }), // Translated message
    status: z.string().min(1, { message: translate('status_is_required') }), // Translated message
  });
};

export default function CdsDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  // State for managing the selected/existing image
  const [selectedImg, setSelectedImg] = useState(edit?.logo_image || undefined);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      adsProvidername: '',
      refreshrate: '',
      status: '',
      ValidFromDate: dayjs(),
      ValidToDate: dayjs(),
    },
  });

  // Update form and image state when edit data changes
  useEffect(() => {
    if (edit) {
      // Populate form fields with the edit record data
      reset({
        name: edit.name || '',
        adsProvidername: typeof edit.adsProvidername === 'string' ? edit.adsProvidername : '',
        refreshrate: typeof edit.refreshrate === 'string' ? edit.refreshrate : '',
        status: typeof edit.status === 'string' ? edit.status : '',
        ValidFromDate:
          edit.ValidFromDate &&
          (typeof edit.ValidFromDate === 'string' || edit.ValidFromDate instanceof Date)
            ? dayjs(edit.ValidFromDate)
            : dayjs(),
        ValidToDate:
          edit.ValidToDate &&
          (typeof edit.ValidToDate === 'string' || edit.ValidToDate instanceof Date)
            ? dayjs(edit.ValidToDate)
            : dayjs(),
      });

      // Set the selected image
      const imageToSet = typeof edit.logo_image === 'string' ? edit.logo_image : undefined;
      setSelectedImg(imageToSet);

      if (imageToSet) {
        setValue('logo_image', imageToSet);
      }
    } else {
      // Reset form to blank values for Add mode
      reset({
        name: '',
        adsProvidername: '',
        refreshrate: '',
        ValidFromDate: dayjs(),
        ValidToDate: dayjs(),
        logo_image: '',
      });

      setSelectedImg(undefined);
    }
  }, [edit, reset, setValue, formTitle]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
        setSelectedImg(imgData);
        setValue('logo_image', imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setSelectedImg(undefined);
    setValue('logo_image', '');
  };

  // Form submission handler
  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    onClose(); // Optionally close drawer after submission
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
      anchor="right"
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
            name="adsProvidername"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('ads_provider_name')}
                helperText={errors.adsProvidername?.message}
                error={Boolean(errors.adsProvidername)}
                placeholder="Enter Provider Name"
              />
            )}
          />

          <Controller
            name="ValidFromDate"
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
            name="ValidToDate"
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
            name="refreshrate"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('refresh_rate')}
                helperText={errors.refreshrate?.message}
                error={Boolean(errors.refreshrate)}
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
              name="logo_image"
              selectedImg={selectedImg}
              onClick={handleRemoveImage}
              quantity={false}
              errors={{}}
              touched={{}}
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
