import Drawer from '@mui/material/Drawer';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import GSRadioWithGSTextInput from '@/components/widgets/inputs/GSRadioWithTextInput';
import { TranslateFn } from '@/types/localization-types';
import dayjs, { Dayjs } from 'dayjs';
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
import { UserRecord } from '@/types/table-types';
import { useDrawerContext } from '@/context/DrawerProvider';
type EditType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
  itemName?: string;
  unit?: string;
  discountName?: string;
};
type PromotionalFormProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};
const radioOptions = [
  { value: 'categories', label: 'Categories' },
  { value: 'products', label: 'Products' },
];
const radioOptions1 = [
  { value: 'percentage', label: 'Percentage Off' },
  { value: 'flatAmount', label: 'Flat Amount Off' },
];

interface FormData {
  discountName: string;
  minimumQuantityRequired: number;
  promotionalItem: {
    type: 'categories' | 'products' | '';
    value: string;
  };
  applyDiscount: {
    type: 'percentage' | 'flatAmount' | '';
    value: string;
  };
  validFromDate: Dayjs; // Changed to Dayjs for consistency
  validToDate: Dayjs; // Changed to Dayjs for consistency
  validFromTime: string; // Required
  validToTime: string; // Required
  outlets: {
    outlet1: boolean; // Explicit outlet name
    outlet2: boolean; // Explicit outlet name
    // Add more outlets here if needed
  };
  selectedDays: { value: string }[]; // Required array of selected days
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    discountName: z.string().min(1, { message: translate('promotion_name_required') }),
    minimumQuantityRequired: z.number().min(1, { message: translate('minimum_Quantity_Required') }),
    promotionalItem: z.object({
      type: z.string().min(1, translate('promotional_type_required')),
      value: z.string().min(1, translate('promotional_value_required')),
    }),
    applyDiscount: z.object({
      type: z.string().min(1, translate('discount_type_required')),
      value: z.string().min(1, translate('discount_value_required')),
    }),
    selectedDays: z.array(z.object({ value: z.string() })).min(1, translate('day_required')),
    outlets: z.record(z.boolean()),
  });
};

const PromotionForm = ({ open, onClose, formTitle, edit, setEdit }: PromotionalFormProps) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const defaultValues: FormData = {
    discountName: '',
    minimumQuantityRequired: 0,
    promotionalItem: { type: 'categories', value: '' }, // Initialized here
    applyDiscount: { type: '', value: '' },
    validFromDate: dayjs(),
    validToDate: dayjs(),
    validFromTime: '',
    validToTime: '',
    selectedDays: [],
    outlets: {
      outlet1: false,
      outlet2: false,
    },
  };
  const { drawerPosition } = useDrawerContext();

  const {
    control,
    handleSubmit,
    reset,
    register,
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
      });
    } else {
      reset({
        ...defaultValues,
      });
    }
  }, [edit, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
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
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
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
                name="discountName"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    {...register('discountName')}
                    label={translate('promotion_name')}
                    placeholder={translate('promotional_name')}
                    error={Boolean(errors.discountName)}
                    helperText={errors.discountName?.message}
                  />
                )}
              />
              <Controller
                name="minimumQuantityRequired"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    label={translate('minimum_Quantity_Required')}
                    error={Boolean(errors.minimumQuantityRequired)}
                    helperText={errors.minimumQuantityRequired?.message}
                  />
                )}
              />
              <Controller
                name="promotionalItem"
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
                      error={Boolean(errors.promotionalItem)}
                      helperText={errors.promotionalItem?.value?.message}
                    />
                  );
                }}
              />
              <Controller
                name="applyDiscount"
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
                      error={Boolean(errors.applyDiscount)}
                      helperText={errors.applyDiscount?.value?.message}
                    />
                  );
                }}
              />
            </FormLayout>
          </Box>
          <Box mb={5}>
            <FormLayout cardHeading={translate('promotional_duration')}>
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
                    placeholder={translate('select_time')}
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
                      label={translate('downtown')}
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
                      label={translate('chaiChee')}
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
