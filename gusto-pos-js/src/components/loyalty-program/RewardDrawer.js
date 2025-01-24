import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';

import { FormControlLabel, Button } from '@mui/material';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { timeSlots } from '@/mock/discount';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import dayjs from 'dayjs';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
import { outlets } from '@/mock/common';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';




































const generateZodSchema = (translate) => {
  return z.object({
    rewardName: z.string().min(1, translate('name_is_required')),
    Pointsrequiredtoclaim: z.string().min(1, translate('this_is_required')),
    terms_conditions: z.string().min(1, translate('terms_condition_is_required')),
    ValidFromDate: z.date().max(new Date(), translate('valid_from_date')),
    ValidToDate: z.date().max(new Date(), translate('valid_to_date')),
    ValidFromTime: z.string().min(1, translate('valid_from_time_required')),
    ValidToTime: z.string().min(1, translate('valid_to_time_required')),
    outlets: z.record(z.boolean())
  });
};

export default function LoyalityDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit
}) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    rewardName: '',
    pointsRequiredToClaim: 0,
    terms_conditions: '',
    validFromDate: dayjs(),
    validToDate: dayjs(),
    validFromTime: '',
    validToTime: '',
    logoImage: '',
    outlets: outlets.reduce(
      (acc, outlet) => {
        acc[outlet.value] = false; // Set initial value for each outlet as false
        return acc;
      },
      {}
    )
  };
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  // Watch the logo_image field
  const logoImage = watch('logoImage');

  useEffect(() => {
    if (edit) {
      // Populate form fields with the edit record data
      reset({
        rewardName: edit.rewardName || '',
        pointsRequiredToClaim: edit.pointsRequiredToClaim || 0,
        logoImage: typeof edit.logoImage === 'string' ? edit.logoImage : ''
      });
    } else {
      // Reset form to blank values for Add mode
      reset({
        rewardName: '',
        pointsRequiredToClaim: 0,
        logoImage: '',
        terms_conditions: ''
      });
    }
  }, [edit, reset]);

  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
        setValue('logoImage', imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setValue('logoImage', '');
  };

  const handleClose = () => {
    reset({
      ...defaultValues
    });
    setEdit(null);
    onClose();
  };
  const handleDrawerClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    handleClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleDrawerClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2
        }
      }}>

      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} />

      <Box mb={5}>
        <FormLayout cardHeading={translate('Reward_details')}>
          <Controller
            control={control}
            name="rewardName"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('name')}
              helperText={errors.rewardName?.message}
              error={Boolean(errors.rewardName)}
              placeholder={translate('enter_name')} />

            } />

          <Controller
            control={control}
            name="pointsRequiredToClaim"
            render={({ field: fieldProps }) =>
            <GSNumberInput
              {...fieldProps}
              label={translate('points_required_to_claim')}
              helperText={errors.pointsRequiredToClaim?.message}
              error={Boolean(errors.pointsRequiredToClaim)}
              placeholder={translate('enter_points_required_to_claim')}
              value={fieldProps.value === 0 ? '' : String(fieldProps.value)} // Convert to string for display
              onChange={(e) => {
                const value = e.target.value;
                fieldProps.onChange(value === '' ? 0 : parseFloat(value)); // Convert back to number
              }} />

            } />

          <Controller
            control={control}
            name="terms_conditions"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
              label={translate('terms_conditions')}
              helperText={errors.terms_conditions?.message}
              error={Boolean(errors.terms_conditions)}
              placeholder={translate('terms_conditions')} />

            } />

          <Controller
            name="validFromDate"
            control={control}
            render={({ field }) =>
            <GSDateInput
              id="valid_from_date"
              {...field}
              label={translate('valid_from_date')}
              value={field.value}
              onChange={(date) => field.onChange(date)} />

            } />

          <Controller
            name="validToDate"
            control={control}
            render={({ field }) =>
            <GSDateInput
              id="valid_to_date"
              {...field}
              label={translate('valid_to_date')}
              value={field.value}
              onChange={(date) => field.onChange(date)} />

            } />

          <Controller
            name="validFromTime"
            control={control}
            render={({ field }) =>
            <GSSelectInput
              {...field}
              label={translate('valid_from_time')}
              options={timeSlots}
              placeholder={translate('valid_from_time_optional')} />

            } />

          <Controller
            name="validToTime"
            control={control}
            render={({ field }) =>
            <GSSelectInput
              {...field}
              label={translate('valid_to_time')}
              options={timeSlots}
              placeholder={translate('valid_to_time_optional')} />

            } />

          <GSCustomStackLayout withoutGrid>
            <GSImageUpload
              name="logoImage"
              selectedImg={logoImage}
              onClick={handleRemoveImage}
              quantity={false}
              category={false}
              onChange={handleImageUpload} />

          </GSCustomStackLayout>
        </FormLayout>
      </Box>
      <Box mb={5}>
        <FormLayout cardHeading={translate('apply_to_these_outlet')}>
          {outlets.map((outlet) =>
          <Controller
            key={outlet.value}
            name={`outlets.${outlet.value}`}
            control={control}
            render={({ field }) =>
            <FormGroup>
                  <FormControlLabel
                control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)} />

                }
                label={translate(outlet.label)} />

                </FormGroup>
            } />

          )}
        </FormLayout>
      </Box>
      <Box
        sx={{
          display: 'flex',
          minWidth: '100%',
          justifyContent: 'flex-end',
          mt: 2
        }}>

        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={handleClose}>
          {translate('cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}>

          {translate('save')}
        </Button>
      </Box>
    </Drawer>);

}