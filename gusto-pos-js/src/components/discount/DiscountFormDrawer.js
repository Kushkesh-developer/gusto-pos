import Drawer from '@mui/material/Drawer';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import GSRadioWithGSTextInput from '@/components/widgets/inputs/GSRadioWithTextInput';
import GSDaySelector from '@/components/widgets/inputs/GSDaySelector';
import { timeSlots } from '@/mock/discount';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';

import { useDrawerContext } from '@/context/DrawerProvider';

const radioOptions = [
  { value: 'percentage', label: 'Percentage Off' },
  { value: 'flatAmount', label: 'Flat Amount Off' },
];

const generateZodSchema = (translate) => {
  return z.object({
    discountName: z.string().min(1, translate('discount_name_required')),
    discountCode: z.string().optional(),
    validFromDate: z.date().max(new Date(), translate('valid_from_date')),
    validToDate: z.date().max(new Date(), translate('valid_to_date')),
    applyDiscount: z.object({
      value: z.string().min(1, { message: translate('discount_type_required') }),
    }),
    selectedDays: z.array(z.object({ value: z.string() })).min(1, translate('day_required')),
    validFromTime: z.string().min(1, translate('valid_from_time_required')),
    validToTime: z.string().min(1, translate('valid_to_time_required')),
    outlets: z.record(z.boolean()),
  });
};

const DiscountForm = ({
  open,
  onClose,
  formTitle,

  edit,
  setEdit,
}) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const defaultValues = {
    discountName: '',
    discountCode: '',
    validFromDate: dayjs(),
    validToDate: dayjs(),
    applyDiscount: { type: '', value: '' },
    selectedDays: [],
    validFromTime: '',
    validToTime: '',
    outlets: {
      outlet1: false,
      outlet2: false,
    },
  };
  const { drawerPosition } = useDrawerContext();

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  console.log(errors, 'erros');

  useEffect(() => {
    if (edit) {
      reset({
        ...defaultValues,
        discountName: edit?.discountName || '',
        discountCode: edit?.discountCode || '',
      });
    } else {
      reset({
        ...defaultValues,
      });
    }
  }, [edit, reset]);

  const onSubmit = () => {
    // Handle form submission, including the outlets data
  };
  const handleClose = () => {
    reset({
      ...defaultValues,
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2,
        },
      }}
    >
      <Box sx={{ maxWidth: '1140px' }}>
        <PageHeader
          title={formTitle}
          hideSearch={true}
          onClose={handleClose}
          showMobileView={true}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={5}>
            <FormLayout cardHeading={translate('discount_form')}>
              <Controller
                name="discountName"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    requiredMark
                    {...register('discountName')}
                    {...field}
                    label={translate('discount_name')}
                    error={Boolean(errors.discountName)}
                    helperText={errors.discountName?.message}
                  />
                )}
              />

              <Controller
                name="discountCode"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    label={translate('discount_code')}
                    error={Boolean(errors.discountCode)}
                    helperText={errors.discountCode?.message}
                  />
                )}
              />

              <GSCustomStackLayout withoutGrid>
                <Controller
                  name="applyDiscount"
                  control={control}
                  render={({ field }) => {
                    const value = field.value || { type: '', value: '' }; // Fallback default
                    return (
                      <GSRadioWithGSTextInput
                        {...field}
                        requiredMark
                        title={translate('add_total_discount')}
                        radioOptions={radioOptions}
                        placeholder={translate('enter_discount')}
                        radioValue={value.type}
                        inputValue={value.value}
                        onRadioChange={(type) => field.onChange({ ...value, type })}
                        onInputChange={(inputValue) =>
                          field.onChange({ ...value, value: inputValue })
                        }
                        error={Boolean(errors.applyDiscount)}
                        helperText={errors.applyDiscount?.value?.message}
                      />
                    );
                  }}
                />

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
              <Controller
                name="validFromDate"
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
                name="validToDate"
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
                name="validFromTime"
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
                name="validToTime"
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
            <FormLayout cardHeading={translate('apply_to_these_outlets')}>
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
                      label={translate('chaiChee')}
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
                      label={translate('downtown')}
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

export default DiscountForm;
