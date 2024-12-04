import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
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

const generateZodSchema = (translate) => {
  return z.object({
    rewardName: z.string().min(1, translate('name_is_required')),
    Pointsrequiredtoclaim: z.string().min(1, translate('this_is_required')),
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

export default function LoyalityDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedImg, setSelectedImg] = useState(edit?.logo_image || undefined);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      rewardName: '',
      Pointsrequiredtoclaim: '',
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
  useEffect(() => {
    if (edit) {
      // Populate form fields with the edit record data
      reset({
        rewardName: edit.rewardName || '',
        Pointsrequiredtoclaim: edit.Pointsrequiredtoclaim || '',
      });

      // Set the selected image
      const imageToSet = typeof edit.logo_image === 'string' ? edit.logo_image : undefined;
      setSelectedImg(imageToSet);

      if (imageToSet) {
        setValue('logo_image', imageToSet);
      }
    } else {
      // Reset form to blank values for Add mode
      reset({
        rewardName: '',
        Pointsrequiredtoclaim: '',
        logo_image: '',
      });

      setSelectedImg(undefined);
    }
  }, [edit, reset, setValue]);
  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
        setSelectedImg(imgData);
        setValue('logo_image', imgData);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setSelectedImg(undefined);
    setValue('logo_image', '');
  };
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
        <FormLayout cardHeading={translate('Reward_details')}>
          <Controller
            control={control}
            name="rewardName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('name')}
                helperText={errors.rewardName?.message}
                error={Boolean(errors.rewardName)}
                placeholder={translate('name')}
              />
            )}
          />

          <Controller
            control={control}
            name="Pointsrequiredtoclaim"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('points_required_to_claim')}
                helperText={errors.Pointsrequiredtoclaim?.message}
                error={Boolean(errors.Pointsrequiredtoclaim)}
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

          <GSCustomStackLayout withoutGrid>
            <GSImageUpload
              name="logo_image"
              selectedImg={selectedImg}
              onClick={handleRemoveImage}
              quantity={false}
              errors={{}}
              touched={{}}
              category={false}
              onChange={handleImageUpload}
            />
          </GSCustomStackLayout>
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
        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={handleClose}>
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
