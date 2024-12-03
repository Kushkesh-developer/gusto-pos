import Drawer from '@mui/material/Drawer';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import GSRadioWithGSTextInput from '@/components/widgets/inputs/GSRadioWithTextInput';

import dayjs from 'dayjs';
import { timeSlots } from '@/mock/discount';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSDaySelector from '@/components/widgets/inputs/GSDaySelector';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';

const radioOptions = [
  { value: 'categories', label: 'Categories' },
  { value: 'products', label: 'Products' },
];

const radioOptions1 = [
  { value: 'percentage', label: 'Percentage off' },
  { value: 'flatAmount', label: 'Flat Amount Off' },
];

const generateZodSchema = (translate) => {
  return z.object({
    DiscountName: z.string().min(1, { message: translate('promotion_name_required') }),
    minimum_Quantity_Required: z
      .number()
      .min(1, { message: translate('minimum_Quantity_Required') }),
    PromotionalItem: z.object({
      type: z.string().min(1, translate('promotional_type_required')),
      value: z.string().min(1, translate('promotional_value_required')),
    }),
    ApplyDiscount: z.object({
      type: z.string().min(1, translate('discount_type_required')),
      value: z.string().min(1, translate('discount_value_required')),
    }),
    selectedDays: z.array(z.object({ value: z.string() })).min(1, translate('day_required')),
    outlets: z.record(z.boolean()),
  });
};

const PromotionForm = ({ open, onClose, formTitle, edit, setEdit }) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      DiscountName: '',
      minimum_Quantity_Required: 0,
      PromotionalItem: { type: 'categories', value: '' }, // Initialized here
      ApplyDiscount: { type: '', value: '' },
      ValidFromDate: dayjs(),
      ValidToDate: dayjs(),
      ValidFromTime: '',
      ValidToTime: '',
      selectedDays: [],
      outlets: {
        outlet1: false,
        outlet2: false,
      },
    },
  });
  useEffect(() => {
    console.log('hello', formTitle, edit?.username);

    reset({
      DiscountName: formTitle === 'Edit Promotion Rules' ? (edit?.DiscountName ?? '') : '',
      // gender: edit?.gender || 'Male',
    });
  }, [edit, reset]);

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
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
      <Box sx={{ maxWidth: '1140px' }}>
        <PageHeader title={formTitle} hideSearch={true} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={5}>
            <FormLayout cardHeading={translate('promotional_form')}>
              <Controller
                name="DiscountName"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    {...register('DiscountName')}
                    label={translate('PromotionName')}
                    placeholder={translate('promotional_name')}
                    error={Boolean(errors.DiscountName)}
                    helperText={errors.DiscountName?.message}
                  />
                )}
              />

              <Controller
                name="minimum_Quantity_Required"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    label={translate('minimum_Quantity_Required')}
                    error={Boolean(errors.minimum_Quantity_Required)}
                    helperText={errors.minimum_Quantity_Required?.message}
                  />
                )}
              />

              <Controller
                name="PromotionalItem"
                control={control}
                render={({ field }) => {
                  const value = field.value || { type: 'categories', value: '' }; // Fallback to default
                  return (
                    <GSRadioWithGSTextInput
                      title={translate('promotional_item')}
                      radioOptions={radioOptions}
                      placeholder={translate('enter_promotion')}
                      radioValue={value.type}
                      inputValue={value.value}
                      onRadioChange={(type) => field.onChange({ ...value, type })}
                      onInputChange={(inputValue) =>
                        field.onChange({ ...value, value: inputValue })
                      }
                      error={Boolean(errors.PromotionalItem)}
                      helperText={errors.PromotionalItem?.message}
                    />
                  );
                }}
              />

              <Controller
                name="ApplyDiscount"
                control={control}
                render={({ field }) => {
                  const value = field.value || { type: '', value: '' }; // Fallback to default
                  return (
                    <GSRadioWithGSTextInput
                      title="Add Total Discount"
                      radioOptions={radioOptions1}
                      placeholder={translate('enter_discount')}
                      radioValue={value.type}
                      inputValue={value.value}
                      onRadioChange={(type) => field.onChange({ ...value, type })}
                      onInputChange={(inputValue) =>
                        field.onChange({ ...value, value: inputValue })
                      }
                      error={Boolean(errors.ApplyDiscount)}
                      helperText={errors.ApplyDiscount?.message}
                    />
                  );
                }}
              />
            </FormLayout>
          </Box>
          <Box mb={5}>
            <FormLayout cardHeading={translate('promotional_duration')}>
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
                    placeholder={translate('select_time')}
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
                    placeholder={translate('select_time')}
                  />
                )}
              />

              <GSCustomStackLayout withoutGrid>
                <Controller
                  name="selectedDays"
                  control={control}
                  render={({ field }) => {
                    const value = field.value || []; // Fallback to empty array
                    return (
                      <GSDaySelector
                        selectedDays={value.map((dayObj) => dayObj.value)}
                        onChange={(day) => {
                          const index = value.findIndex((d) => d.value === day);
                          if (index >= 0) {
                            field.onChange(value.filter((d) => d.value !== day));
                          } else {
                            field.onChange([...value, { value: day }]);
                          }
                        }}
                      />
                    );
                  }}
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
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }} onClick={handleClose}>
              {translate('cancel')}
            </CustomButton>
            <CustomButton variant="contained" type="submit">
              {translate('save')}
            </CustomButton>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default PromotionForm;
