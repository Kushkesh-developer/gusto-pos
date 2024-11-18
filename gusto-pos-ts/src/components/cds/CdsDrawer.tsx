import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import DateInput from '@/components/widgets/inputs/GSDateInput';
import dayjs, { Dayjs } from 'dayjs';
import { TranslateFn } from '@/types/localization-types';
import { Typography, Button } from '@mui/material';
import GSImageUpload from '../widgets/image/GSImageUpload';

type OutletDrawerProps = {
  open: boolean;
  onClose: () => void;
};

interface FormData {
  adsProvidername: string;
  order: string;
  ValidFromDate: Dayjs; // Changed to Dayjs for consistency
  ValidToDate: Dayjs; // C
  refreshrate: string;
  logo_image: string;
}
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    adsProvidename: z.string().min(1, translate('add_provider_name_is_required')),
    ValidFromDate: z.date().max(new Date(), translate('valid_from_date')),
    ValidToDate: z.date().max(new Date(), translate('valid_to_date')),
    refreshrate: z.string().min(1, translate('refresh_rate_is_required')),
  });
};
export default function CdsDrawer(props: OutletDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      adsProvidername: '',
      refreshrate: '',
      ValidFromDate: dayjs(),
      ValidToDate: dayjs(),
    },
  });
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

  const handleRemoveImage = () => {
    setSelectedImg(undefined);
    setValue('logo_image', ''); // Clear the slider_image value in the form
  };
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <Typography variant="h6">{translate('add_new_ads')} </Typography>
      <Box mb={5}>
        <FormLayout cardHeading={translate('ads_details')}>
          <Controller
            control={control}
            name="adsProvidername"
            render={({ field }) => (
              <TextInput
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
              <TextInput
                {...field}
                label={translate('refresh_rate')}
                helperText={errors.adsProvidername?.message}
                error={Boolean(errors.adsProvidername)}
                placeholder={translate('refresh_rate')}
              />
            )}
          />
          <Controller
            name="ValidFromDate"
            control={control}
            render={({ field }) => (
              <DateInput
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
              <DateInput
                id="valid_to_date"
                {...field}
                label={translate('valid_to_date')}
                value={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
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
        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={props.onClose}>
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
