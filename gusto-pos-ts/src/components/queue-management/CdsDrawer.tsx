import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import dayjs, { Dayjs } from 'dayjs';
import { TranslateFn } from '@/types/localization-types';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
  
type editType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
  itemName?: string;
  unit?: string;
  logo_image?: string; // Added to handle existing image
}

type OutletDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: editType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};

interface FormData {
  name: string;
  adsProvidername: string;
  order?: string;
  ValidFromDate: Dayjs;
  ValidToDate: Dayjs;
  refreshrate: string;
  logo_image?: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    name: z.string().min(1, { message: translate('name_is_required') }),
    adsProvidename: z.string().min(1, translate('add_provider_name_is_required')),
    ValidFromDate: z.date().max(new Date(), translate('valid_from_date')),
    ValidToDate: z.date().max(new Date(), translate('valid_to_date')),
    refreshrate: z.string().min(1, translate('refresh_rate_is_required')),
  });
};

export default function CdsDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit
}: OutletDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  
  // State for managing the selected/existing image
  const [selectedImg, setSelectedImg] = useState<string | undefined>(
    edit?.logo_image || undefined
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      adsProvidername: '',
      refreshrate: '',
      ValidFromDate: dayjs(),
      ValidToDate: dayjs(),
      logo_image: edit?.logo_image || '', // Add existing image to default values
    },
  });

  // Update form and image state when edit data changes
  useEffect(() => {
    // Reset form with edit data when in edit mode
    reset({
      name: formTitle === "Edit New Provider" ? (edit?.name ?? '') : '',
      adsProvidername: edit?.adsProvidername ?? '',
      refreshrate: edit?.refreshrate ?? '',
      ValidFromDate: edit?.ValidFromDate ? dayjs(edit.ValidFromDate) : dayjs(),
      ValidToDate: edit?.ValidToDate ? dayjs(edit.ValidToDate) : dayjs(),
      logo_image: edit?.logo_image || '',
    });

    // Update selected image state
    setSelectedImg(edit?.logo_image || undefined);
  }, [edit, reset, formTitle]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result as string;
        setSelectedImg(imgData);
        setValue('logo_image', imgData); // Set the image data in the form
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle image removal
  const handleRemoveImage = () => {
    setSelectedImg(undefined);
    setValue('logo_image', ''); // Clear the logo_image value in the form
  };

  // Form submission handler
  const onSubmit: SubmitHandler<FormData|editType> = (data) => {
    console.log(data); // Example of handling the data
    // TODO: Implement actual submission logic
  };

  // Close drawer handler
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
        <FormLayout cardHeading={translate('ads_details')}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <GSTextInput
                {...register('name')}
                label={translate('name')}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
                placeholder={translate('name')}
              />
            )}
          />
          <Controller
            control={control}
            name="adsProvidername"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('ads_provider')}
                helperText={errors.adsProvidername?.message}
                error={Boolean(errors.adsProvidername)}
                placeholder={translate('ads_provider')}
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
                placeholder={translate('refresh_rate')}
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
          <GSCustomStackLayout withoutGrid>
            <GSImageUpload
              name="logo_image"
              selectedImg={selectedImg}
              onClick={handleRemoveImage}
              quantity={false}
              errors={{ slider_image: errors.logo_image?.message }}
              touched={{}} // You can manage touched state if necessary
              category={false}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(event)}
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
        <Button 
          variant="outlined" 
          sx={{ h: 10, w: 10, minWidth: 120 }} 
          onClick={handleClose}
        >
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