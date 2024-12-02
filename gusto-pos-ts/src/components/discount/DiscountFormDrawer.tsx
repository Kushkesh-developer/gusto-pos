import Drawer from '@mui/material/Drawer';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
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
import { TranslateFn } from '@/types/localization-types';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { UserRecord } from '@/types/table-types';

type editType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
  itemName?: string;
  unit?: string;
  DiscountName?: string;
};
type DiscountFormProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: editType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};
const radioOptions = [
  { value: 'percentage', label: 'Percentage off' },
  { value: 'flatAmount', label: 'Flat Amount Off' },
];
interface FormData {
  DiscountName: string; // Required
  DiscountCode?: string; // Optional
  ValidFromDate: Dayjs; // Changed to Dayjs for consistency
  ValidToDate: Dayjs; // Changed to Dayjs for consistency
  ApplyDiscount: {
    type: 'percentage' | 'flatAmount' | ''; // Explicit types for clarity
    value: string;
  };
  selectedDays: { value: string }[]; // Required array of selected days
  ValidFromTime: string; // Required
  ValidToTime: string; // Required
  outlets: {
    outlet1: boolean; // Explicit outlet name
    outlet2: boolean; // Explicit outlet name
    // Add more outlets here if needed
  };
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    DiscountName: z.string().min(1, translate('discount_name_required')),
    DiscountCode: z.string().optional(),
    ValidFromDate: z.date().max(new Date(), translate('valid_from_date')),
    ValidToDate: z.date().max(new Date(), translate('valid_to_date')),
    ApplyDiscount: z.object({
      type: z.string().min(1, translate('discount_type_required')),
      value: z.string().min(1, translate('discount_value_required')),
    }),
    selectedDays: z.array(z.object({ value: z.string() })).min(1, translate('day_required')),
    ValidFromTime: z.string().min(1, translate('valid_from_time_required')),
    ValidToTime: z.string().min(1, translate('valid_to_time_required')),
    outlets: z.record(z.boolean()),
  });
};

const DiscountForm = ({
  open,
  onClose,
  formTitle,

  edit,
  setEdit,
}: DiscountFormProps) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      DiscountName: '',
      ValidFromDate: dayjs(),
      ValidToDate: dayjs(),
      ApplyDiscount: { type: '', value: '' },
      selectedDays: [],
      ValidFromTime: '',
      ValidToTime: '',
      outlets: {
        outlet1: false,
        outlet2: false,
      },
    },
  });
  useEffect(() => {
    console.log('hello', formTitle, edit?.username);

    reset({
      DiscountName: formTitle === 'Edit Disount Options' ? (edit?.DiscountName ?? '') : '',
      // gender: edit?.gender || 'Male',
    });
  }, [edit, reset]);
  const onSubmit: SubmitHandler<FormData> = () => {
    // Handle form submission, including the outlets data
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
            <FormLayout cardHeading={translate('discount_form')}>
              <Controller
                name="DiscountName"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...register('DiscountName')}
                    {...field}
                    label={translate('discount_name')}
                    error={Boolean(errors.DiscountName)}
                    helperText={errors.DiscountName?.message}
                  />
                )}
              />
              <Controller
                name="DiscountCode"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    label={translate('discount_code')}
                    error={Boolean(errors.DiscountCode)}
                    helperText={errors.DiscountCode?.message}
                  />
                )}
              />
              <GSCustomStackLayout withoutGrid>
                <Controller
                  name="ApplyDiscount"
                  control={control}
                  render={({ field }) => {
                    const value = field.value || { type: '', value: '' }; // Fallback default
                    return (
                      <GSRadioWithGSTextInput
                        {...field}
                        title="Add Total Discount"
                        radioOptions={radioOptions}
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
