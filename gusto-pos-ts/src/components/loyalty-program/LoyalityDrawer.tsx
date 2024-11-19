import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { TranslateFn } from '@/types/localization-types';
import { FormControlLabel, Typography, Button } from '@mui/material';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { timeSlots } from '@/mock/discount';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import dayjs, { Dayjs } from 'dayjs';

type LoyalityDrawerProps = {
  open: boolean;
  onClose: () => void;
};

interface FormData {
  name: string;
  pointsRequiredToClaim: string;
  terms_conditions: string;
  imageUpload: string;
  ValidFromDate: Dayjs; // Changed to Dayjs for consistency
  ValidToDate: Dayjs; // Changed to Dayjs for consistency
  ValidFromTime: string; // Required
  ValidToTime: string;
  outlets: {
    outlet1: boolean; // Explicit outlet name
    outlet2: boolean; // Explicit outlet name
    // Add more outlets here if needed
  };
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    name: z.string().min(1, translate('name_is_required')),
    pointsRequiredToClaim: z.string().min(1, translate('this_is_required')),
    terms_conditions: z.string().min(1, translate('terms_condition_is_required')),
    ValidFromDate: z.date().max(new Date(), translate('valid_from_date')),
    ValidToDate: z.date().max(new Date(), translate('valid_to_date')),
    ValidFromTime: z.string().min(1, translate('valid_from_time_required')),
    ValidToTime: z.string().min(1, translate('valid_to_time_required')),
    outlets: z.object({
      outlet1: z.boolean(),
      outlet2: z.boolean(),
    }),
  });
};

export default function LoyalityDrawer(props: LoyalityDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      pointsRequiredToClaim: '',
      terms_conditions: '',
      imageUpload: '',
      ValidFromDate: dayjs(),
      ValidToDate: dayjs(),
      ValidFromTime: '',
      ValidToTime: '',
      outlets: {
        outlet1: false,
        outlet2: false,
      },
    },
  });

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
      <Typography variant="h6">{translate('add_rewards')} </Typography>
      <Box mb={5}>
        <FormLayout cardHeading={translate('Reward_details')}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('name')}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
                placeholder={translate('name')}
              />
            )}
          />
          <Controller
            control={control}
            name="pointsRequiredToClaim"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('points_required_to_claim')}
                helperText={errors.pointsRequiredToClaim?.message}
                error={Boolean(errors.pointsRequiredToClaim)}
                placeholder={translate('points_required_to_claim')}
              />
            )}
          />
          <Controller
            control={control}
            name="terms_conditions"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('terms_conditions')}
                helperText={errors.terms_conditions?.message}
                error={Boolean(errors.terms_conditions)}
                placeholder={translate('terms_conditions')}
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
            name="ValidFromTime"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('valid_from_time')}
                options={timeSlots}
                placeholder={translate('valid_from_time_optional')} // Updated placeholder
              />
            )}
          />
          <Controller
            name="ValidToTime"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('valid_to_time')}
                options={timeSlots}
                placeholder={translate('valid_to_time_optional')} // Updated placeholder
              />
            )}
          />
        </FormLayout>
      </Box>
      <Box mb={5}>
        <FormLayout cardHeading={translate('Apply to these Outlets')}>
          <Controller
            name="outlets.outlet1"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={translate('outlet')}
                />
              </FormGroup>
            )}
          />
          <Controller
            name="outlets.outlet2"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={translate('outlet')}
                />
              </FormGroup>
            )}
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
