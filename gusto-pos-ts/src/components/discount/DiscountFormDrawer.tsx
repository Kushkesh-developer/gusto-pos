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
import { useDrawerContext } from '@/context/DrawerProvider';
import { outlets } from '@/mock/common';
type EditType = {
  [key: string]: unknown;
  discountName?: string;
  discountCode?: string;
};
type DiscountFormProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};
const radioOptions = [
  { value: 'percentage', label: 'Percentage Off' },
  { value: 'flatAmount', label: 'Flat Amount Off' },
];
interface FormData {
  discountName: string; // Required
  discountCode?: string; // Optional
  validFromDate: Dayjs; // Changed to Dayjs for consistency
  validToDate: Dayjs; // Changed to Dayjs for consistency
  applyDiscount: {
    type: 'percentage' | 'flatAmount' | ''; // Explicit types for clarity
    value: string;
  };
  selectedDays: { value: string }[]; // Required array of selected days
  validFromTime: string; // Required
  validToTime: string; // Required
  outlets: {
    [key: string]: boolean; // This will accommodate all outlet keys dynamically
  };
}

const generateZodSchema = (translate: TranslateFn) => {
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
}: DiscountFormProps) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const defaultValues: FormData = {
    discountName: '',
    discountCode: '',
    validFromDate: dayjs(),
    validToDate: dayjs(),
    applyDiscount: { type: '', value: '' },
    selectedDays: [],
    validFromTime: '',
    validToTime: '',
    outlets: outlets.reduce(
      (acc, outlet) => {
        acc[outlet.value] = false; // Set initial value for each outlet as false
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  };
  const { drawerPosition } = useDrawerContext();

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
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

  const onSubmit: SubmitHandler<FormData> = () => {
    // Handle form submission, including the outlets data
  };
  const handleClose = () => {
    reset({
      ...defaultValues,
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  const handleDrawerClose = (event: React.SyntheticEvent, reason: string) => {
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
          p: 2,
        },
      }}
    >
      <Box sx={{ maxWidth: '1140px' }}>
        <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} />
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
                    placeholder={translate('enter_discount_name')}
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
                    placeholder={translate('enter_discount_code')}
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
            <FormLayout cardHeading={translate('apply_to_these_outlet')}>
              {outlets.map((outlet) => (
                <Controller
                  key={outlet.value}
                  name={`outlets.${outlet.value}`}
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
                        label={translate(outlet.label)}
                      />
                    </FormGroup>
                  )}
                />
              ))}
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
