'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import * as z from 'zod';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { Box } from '@mui/material';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';

const generateZodSchema = (translate) => {
  return z.object({
    company_name: z.string().min(1, translate('company_name_required')),
    country: z.string().min(1, translate('country_required')),
    taxId: z.string().min(1, translate('taxId_required')),
    about_us: z.string().min(1, translate('about_us_required')),
    contact_name: z.string().min(1, translate('contact_name_required')),
    company_email: z.string().min(1, translate('company_email_required')),
    phone_number: z.string().min(1, translate('phone_number_required')),
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
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      company_name: '',
      country: '',
      taxId: '',
      about_us: '',
      contact_name: '',
      company_email: '',
      phone_number: '',
      address1: '',
      address2: '',
    },
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout cardHeading={translate('business_information')}>
        <Controller
          control={control}
          name="company_name"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('company_name')}
              helperText={errors.company_name?.message}
              error={Boolean(errors.company_name)}
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
          name="about_us"
          control={control}
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('about_us')}
              helperText={errors.about_us?.message}
              error={Boolean(errors.about_us)}
              placeholder={translate('about_us_placeholder')}
            />
          )}
        />
      </FormLayout>

      <FormLayout cardHeading={translate('contact_details')}>
        <Controller
          control={control}
          name="contact_name"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('contact_name')}
              helperText={errors.contact_name?.message}
              error={Boolean(errors.contact_name)}
              placeholder={translate('enter_contact_name')}
            />
          )}
        />

        <Controller
          control={control}
          name="company_email"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('company_email')}
              helperText={errors.company_email?.message}
              error={Boolean(errors.company_email)}
              placeholder={translate('enter_company_email')}
            />
          )}
        />

        <Controller
          control={control}
          name="phone_number"
          render={({ field }) => (
            <GSTextInput
              {...field}
              label={translate('phone_number')}
              helperText={errors.phone_number?.message}
              error={Boolean(errors.phone_number)}
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
