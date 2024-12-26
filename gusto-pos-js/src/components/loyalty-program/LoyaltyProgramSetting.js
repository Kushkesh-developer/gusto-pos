'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';











const singleTierConfig = {
  tier: 'membership_tier_1',
  fields: [
  { name: 'membership_name', labelKey: 'membership_name' },
  { name: 'minimum_point_to_redeem', labelKey: 'minimum_point_to_redeem' },
  { name: 'expiry_period', labelKey: 'expiry_period' },
  { name: 'unlock_accumulated', labelKey: 'unlock_accumulated' },
  { name: 'maximum_point', labelKey: 'maximum_point' },
  { name: '$1_spent_equal_to', labelKey: '$1_spent_equal_to' }]

};

const generateZodSchema = (translate) => {
  return z.object({
    membership_name: z.string().min(1, { message: translate('membership_name_required') }),
    minimum_point_to_redeem: z.
    number().
    min(1, { message: translate('minimum_point_to_redeem_required') }),
    expiry_period: z.string().min(1, { message: translate('expiry_period_required') }),
    unlock_accumulated: z.string().min(1, { message: translate('unlock_accumulated_required') }),
    maximum_point: z.number().min(1, { message: translate('maximum_point_required') }),
    $1_spent_equal_to: z.string().min(1, { message: translate('$1_spent_equal_to_required') })
  });
};

const LoyaltyProgramSetting = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      membership_name: '',
      minimum_point_to_redeem: 0,
      expiry_period: '',
      unlock_accumulated: '',
      maximum_point: 0,
      $1_spent_equal_to: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ maxWidth: '1140px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout cardHeading={translate(singleTierConfig.tier)}>
          {singleTierConfig.fields.map(({ name, labelKey }) =>
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) =>
            <GSTextInput
              {...field}
              placeholder={translate(labelKey)}
              label={translate(labelKey)}
              error={Boolean(errors[name])}
              helperText={errors[name]?.message} // Access the specific field error
            />
            } />

          )}
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
    </Box>);

};

export default LoyaltyProgramSetting;