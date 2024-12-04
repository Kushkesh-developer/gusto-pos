import React, { useEffect, useMemo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dayjs from 'dayjs';
import { Drawer, Box, Button } from '@mui/material';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useLocalization } from '@/context/LocalizationProvider';

// External File Upload Handler
const handleImageUpload = (event, setValue, fieldName) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Type assertion to match FormData interface
      setValue(fieldName, reader.result);
    };
    reader.readAsDataURL(file);
  }
};

// Constant Definitions
const STATUS_OPTIONS = ['waiting', 'pending', 'cancelled', 'active', 'other'];

// Zod Schema Generator
const generateZodSchema = (translate) =>
  z.object({
    name: z.string().min(1, { message: translate('name_is_required') }),
    adsProvidername: z.string().min(1, { message: translate('provider_name_is_required') }),
    refreshrate: z.string().min(1, { message: translate('refresh_rate_is_required') }),
    status: z.string().min(1, { message: translate('status_is_required') }),
    ValidFromDate: z.date().or(z.string()).optional(),
    ValidToDate: z.date().or(z.string()).optional(),
  });

export default function CdsDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();

  // Memoized Zod schema
  const schema = useMemo(() => generateZodSchema(translate), [translate]);

  // Memoized status options with translations
  const translatedStatusOptions = useMemo(
    () => STATUS_OPTIONS.map((status) => ({ value: status, label: translate(status) })),
    [translate],
  );

  // Form Initialization
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
      logo_image: '',
    },
  });

  // Form Reset and Populate Logic
  useEffect(() => {
    if (edit && open) {
      reset({
        name: edit.name ?? '',
        adsProvidername: edit.adsProvidername ?? '',
        refreshrate: edit.refreshrate ?? '',
        status: edit.status ?? '',
        ValidFromDate: edit.ValidFromDate ? dayjs(edit.ValidFromDate) : dayjs(),
        ValidToDate: edit.ValidToDate ? dayjs(edit.ValidToDate) : dayjs(),
        logo_image: edit.logo_image ?? '',
      });
    }
  }, [open, edit, reset]);

  // Form Submission Handler
  const onSubmit = useCallback(
    (data) => {
      console.log('Submitted Data:', data);
      onClose();
    },
    [onClose],
  );

  // Close Drawer Handler
  const handleClose = useCallback(() => {
    setEdit(null);
    onClose();
  }, [setEdit, onClose]);

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '50%',
          p: 2,
        },
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
                options={translatedStatusOptions}
                placeholder={translate('select_status')}
                helperText={errors.status?.message}
                error={Boolean(errors.status)}
              />
            )}
          />

          <GSCustomStackLayout withoutGrid>
            <Controller
              name="logo_image"
              control={control}
              render={({ field }) => (
                <GSImageUpload
                  name={field.name}
                  selectedImg={field.value}
                  onClick={() => field.onChange('')} // Clear the field on remove
                  onChange={(event) => handleImageUpload(event, setValue, 'logo_image')}
                  quantity={false}
                  category={false}
                />
              )}
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
