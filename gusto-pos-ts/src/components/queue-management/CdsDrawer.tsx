import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import dayjs, { Dayjs } from 'dayjs';
import { TranslateFn } from '@/types/localization-types';
import { Button } from '@mui/material';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { UserRecord } from '@/types/table-types';

type editType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  adsProvidername: string;
  [key: string]: unknown;
  itemName?: string;
  refreshrate: string;
  unit?: string;
  status: string;
  logo_image?: string; // Existing image path or base64
};

type OutletDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode: boolean;
  edit?: editType | null;
  setEdit: Dispatch<SetStateAction<editType | null>>;
};

interface FormData {
  name: string;
  adsProvidername: string;
  refreshrate: string;
  ValidFromDate: Dayjs;
  ValidToDate: Dayjs;
  logo_image?: string;
  status?: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    name: z.string().min(1, { message: translate('name_is_required') }),
    adsProvidername: z.string().min(1, { message: translate('provider_name_is_required') }),
    refreshrate: z.string().min(1, { message: translate('refresh_rate_is_required') }),
    status: z.string().min(1, { message: translate('status_is_required') }),
  });
};

export default function CdsDrawer({ open, onClose, formTitle, edit, setEdit }: OutletDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    getValues,
    watch,
  } = useForm<FormData>({
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

  // Watch the logo_image field
  const logoImage = watch('logo_image');

  // Update form when edit data changes

  useEffect(() => {
    if (edit) {
      reset({
        name: edit.name ?? '',
        adsProvidername: edit.adsProvidername ?? '',
        refreshrate: edit.refreshrate ?? '',
        status: edit.status ?? '',
        logo_image: edit.logo_image ?? '',
      });
    }
  }, [edit, reset]);
  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result as string;
        setValue('logo_image', imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setValue('logo_image', '');
  };

  // Form submission handler
  const onSubmit: SubmitHandler<FormData | editType> = (data) => {
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
