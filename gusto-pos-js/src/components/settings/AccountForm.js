'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLocalization } from '@/context/LocalizationProvider';
import { Box } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';

import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import ProfileImage from '@/components/widgets/image/ProfileImage';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import EncoreSky from '@/public/encoresky.webp';
import GSTextArea from '@/components/widgets/inputs/GSTextArea';










const generateZodSchema = (translate) => {
  return z.object({
    firstName: z.string().min(1, translate('first_name_is_required')),
    lastName: z.string().min(1, translate('last_name_is_required')),
    email: z.string().email(translate('invalid_email')),
    title: z.string().min(1, translate('title_is_required')),
    sliderImage: z.string().min(1, translate('slider_image_required')) // Ensure slider_image validation
  });
};
const AccountForm = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      sliderImage: ''
    }
  });

  const onSubmit = () => {

    // eslint-disable-next-line no-console
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate('profile')}>
            <ProfileImage
              alt="profile_image"
              size={100} // Optional: Customize size
              defaultSrc={EncoreSky.src}
              priority={true}
              // Optional: Set default image
            />

            <Controller
              name="firstName"
              control={control}
              render={({ field }) =>
              <GSTextInput
                {...field}
                label={translate('first_name')}
                helperText={errors.firstName?.message}
                error={Boolean(errors.firstName)}
                placeholder={translate('enter_first_name')} />

              } />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) =>
              <GSTextInput
                {...field}
                label={translate('last_name')}
                helperText={errors.lastName?.message}
                error={Boolean(errors.firstName)}
                placeholder={translate('enter_last_name')} />

              } />

            <Controller
              name="email"
              control={control}
              render={({ field }) =>
              <GSTextInput
                {...field}
                label={translate('email')}
                helperText={errors.email?.message}
                error={Boolean(errors.email)}
                placeholder={translate('enter_email')} />

              } />

            <Controller
              name="title"
              control={control}
              render={({ field }) =>
              <GSTextInput
                {...field}
                label={translate('title_name')}
                helperText={errors.title?.message}
                error={Boolean(errors.title)}
                placeholder={translate('enter_title')} />

              } />

            <GSCustomStackLayout withoutGrid>
              <Controller
                name="bio"
                control={control}
                render={({ field }) =>
                <GSTextArea
                  {...field}
                  label={translate('add_bio')}
                  helperText={errors.bio?.message}
                  placeholder={translate('enter_your_bio')}
                  sx={{ mt: 2 }} />

                } />

            </GSCustomStackLayout>
          </FormLayout>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
              {translate('cancel')}
            </CustomButton>
            <CustomButton variant="contained" type="submit">
              {translate('save_change')}
            </CustomButton>
          </Box>
        </Box>
      </form>
    </div>
  );
};
export default AccountForm;