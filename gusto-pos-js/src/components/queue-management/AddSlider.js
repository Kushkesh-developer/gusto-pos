'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';

import { timeSlots } from '@/mock/discount';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';










// Zod schema generation function with localized error messages
const generateZodSchema = (translate) => {
  return z.object({
    adsProviderName: z.string().min(1, translate('ads_provider_name_required')),
    order: z.string().min(1, translate('order_required')),
    refreshRate: z.string().min(1, translate('refresh_rate_required')),
    validFromDateOptional: z.date().max(new Date(), translate('valid_from_date_optional_required')),
    validToDateOptional: z.date().max(new Date(), translate('valid_to_date_optional_required')),
    sliderImage: z.string().min(1, translate('slider_image_required')) // Ensure slider_image validation
  });
};

const AddSlider = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedImg, setSelectedImg] = useState(undefined);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue // To set the slider_image value in the form
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      adsProviderName: '',
      order: '',
      refreshRate: '',
      validToDateOptional: dayjs().toDate(),
      validFromDateOptional: dayjs().toDate(),
      sliderImage: ''
    }
  });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
        setSelectedImg(imgData);
        setValue('sliderImage', imgData); // Set the image data in the form
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImg(undefined);
    setValue('sliderImage', ''); // Clear the slider_image value in the form
  };

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    // Implement your submit logic here
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate('advertisement_details')}>
            <Controller
              control={control}
              name="adsProviderName"
              render={({ field }) =>
              <GSTextInput
                {...field}
                label={translate('ads_provider_name')}
                helperText={errors.adsProviderName?.message}
                error={Boolean(errors.adsProviderName)}
                placeholder={translate('ads_provider_name')} />

              } />

            <Controller
              name="order"
              control={control}
              render={({ field }) =>
              <GSSelectInput
                {...field}
                label={translate('order')}
                options={timeSlots}
                placeholder={translate('order')} />

              } />

            <Controller
              name="validFromDateOptional"
              control={control}
              render={({ field }) =>
              <GSDateInput
                id="valid_from_date_optional"
                {...field}
                label={translate('valid_from_date_optional')}
                value={field.value}
                onChange={(date) => field.onChange(date)} />

              } />

            <Controller
              name="validToDateOptional"
              control={control}
              render={({ field }) =>
              <GSDateInput
                id="valid_to_date_optional"
                {...field}
                label={translate('valid_to_date_optional')}
                value={field.value}
                onChange={(date) => field.onChange(date)} />

              } />

            <Controller
              name="refreshRate"
              control={control}
              render={({ field }) =>
              <GSSelectInput
                {...field}
                label={translate('refresh_rate')}
                options={timeSlots}
                placeholder={translate('refresh_rate')} />

              } />

          </FormLayout>
          <FormLayout cardHeading={translate('upload_image')}>
            <GSImageUpload
              name="slider_image"
              selectedImg={selectedImg}
              onClick={handleRemoveImage}
              quantity={false}
              errors={{ sliderImage: errors.sliderImage?.message }}
              touched={{}} // You can manage touched state if necessary
              imagelabel={translate('upload_image')}
              category={false}
              onChange={(event) => handleImageUpload(event)} />

          </FormLayout>
        </Box>
        <Box mb={5}>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
              {translate('cancel')}
            </CustomButton>
            <CustomButton variant="contained" type="submit">
              {translate('save')}
            </CustomButton>
          </Box>
        </Box>
      </form>
    </Box>);

};

export default AddSlider;