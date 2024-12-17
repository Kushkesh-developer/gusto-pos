'use client';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import * as z from 'zod';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { Box } from '@mui/material';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import { TranslateFn } from '@/types/localization-types';

interface formData {
  companyName: string;
  country: string;
  taxId: string;
  aboutUs: string;
  contactName: string;
  companyEmail: string;
  phoneNumber: string;
  address1: string;
  address2: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    companyName: z.string().min(1, translate('company_name_required')),
    country: z.string().min(1, translate('country_required')),
    taxId: z.string().min(1, translate('tax_id_required')),
    aboutUs: z.string().min(1, translate('about_us_required')),
    contactName: z.string().min(1, translate('contact_name_required')),
    companyEmail: z.string().min(1, translate('company_email_required')),
    phoneNumber: z.string().min(1, translate('phone_number_required')),
    address1: z.string().min(1, translate('address1_required')),
    address2: z.string().min(1, translate('address2_required')),
  });
};

const BusinessInfo = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: '',
      country: '',
      taxId: '',
      aboutUs: '',
      contactName: '',
      companyEmail: '',
      phoneNumber: '',
      address1: '',
      address2: '',
    },
  });

  const onSubmit: SubmitHandler<formData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout cardHeading={translate('business_information')}>
        <Controller
          control={control}
          name="companyName"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('company_name')}
              helperText={errors.companyName?.message}
              error={Boolean(errors.companyName)}
              placeholder={translate('enter_company_name')}
            />
          )}
        />
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('country')}
              helperText={errors.country?.message}
              error={Boolean(errors.country)}
              placeholder={translate('enter_country')}
            />
          )}
        />
        <Controller
          control={control}
          name="taxId"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('tax_id')}
              helperText={errors.taxId?.message}
              error={Boolean(errors.taxId)}
              placeholder={translate('enter_tax_id')}
            />
          )}
        />
        <Controller
          name="aboutUs"
          control={control}
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('about_us')}
              helperText={errors.aboutUs?.message}
              error={Boolean(errors.aboutUs)}
              placeholder={translate('about_us_placeholder')}
            />
          )}
        />
      </FormLayout>

      <FormLayout cardHeading={translate('contact_details')}>
        <Controller
          control={control}
          name="contactName"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('contact_name')}
              helperText={errors.contactName?.message}
              error={Boolean(errors.contactName)}
              placeholder={translate('enter_contact_name')}
            />
          )}
        />
        <Controller
          control={control}
          name="companyEmail"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('company_email')}
              helperText={errors.companyEmail?.message}
              error={Boolean(errors.companyEmail)}
              placeholder={translate('enter_company_email')}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('phone_number')}
              helperText={errors.phoneNumber?.message}
              error={Boolean(errors.phoneNumber)}
              placeholder={translate('enter_phone_number')}
            />
          )}
        />
        <Controller
          control={control}
          name="address1"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('address1')}
              helperText={errors.address1?.message}
              error={Boolean(errors.address1)}
              placeholder={translate('enter_address1')}
            />
          )}
        />
        <Controller
          control={control}
          name="address2"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('address2')}
              helperText={errors.address2?.message}
              error={Boolean(errors.address2)}
              placeholder={translate('enter_address2')}
            />
          )}
        />
      </FormLayout>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
          {translate('cancel')}
        </CustomButton>

        <CustomButton variant="contained" type="submit">
          {translate('save')}
        </CustomButton>
      </Box>
    </form>
  );
};

export default BusinessInfo;
