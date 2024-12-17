import Drawer from '@mui/material/Drawer';
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import { TranslateFn } from '@/types/localization-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { UserRecord } from '@/types/table-types';
import { Dispatch, SetStateAction } from 'react';
import { useDrawerContext } from '@/context/DrawerProvider';
type EditType = {
  userName?: string;
  id?: string | number;
  email?: string;
  group: string;
  name?: string;
  [key: string]: unknown;
};
type CustomerFormDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};
interface FormData {
  gender: string;
  userName: string;
  phoneNumber: string;
  email: string;
  group: string;
  dateOfBirth: Date;
  maritalStatus: string;
  nationality: string;
  facebook: string;
  linkedIn: string;
  twitter: string;
  address: string;
  numberOfPurchases: string;
  lowestSpend: string;
  highestSpend: string;
  avgSpend: string;
  note: string;
  // selectedDays: { value: string }[]; // Use array of objects for useFieldArray
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    gender: z.string().min(1, translate('gender_required')),
    userName: z.string().min(1, translate('customer_name_required')),
    phoneNumber: z.string().min(1, translate('phone_number_required')),
    email: z.string().email(translate('invalid_email')),
    group: z.string().min(1, translate('customer_group_required')),
    dateOfBirth: z
      .date({ required_error: translate('date_of_birth_past') })
      .max(new Date(), { message: translate('date_of_birth_past') }),
    maritalStatus: z.string().min(1, translate('marital_status_required')),
    nationality: z.string().min(1, translate('nationality_required')),
    facebook: z.string().optional(),
    linkedIn: z.string().optional(),
    twitter: z.string().optional(),
    address: z.string().min(1, translate('address_required')),
    numberOfPurchases: z.string().min(1, translate('number_of_purchases_required')),
    lowestSpend: z.string().min(1, translate('lowest_spend_required')),
    highestSpend: z.string().min(1, translate('highest_spend_required')),
    avgSpend: z.string().min(1, translate('average_spend_required')),
    note: z.string().optional(),
    //   selectedDays: z
    //     .array(z.object({ value: z.string() }))
    //     .min(1, translate("day_required")), // Array of objects with day values
  });
};

const CustomerForm = ({ open, onClose, formTitle, edit, setEdit }: CustomerFormDrawerProps) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: '',
      userName: formTitle === translate('edit_customer') ? (edit?.userName ?? '') : '',
      phoneNumber: '',
      email: '',
      group: '',
      dateOfBirth: new Date(),
      maritalStatus: '',
      nationality: '',
      facebook: '',
      linkedIn: '',
      twitter: '',
      address: '',
      numberOfPurchases: '',
      lowestSpend: '',
      highestSpend: '',
      avgSpend: '',
      note: '',
      // selectedDays: [], // Initialize as an empty array for selected days
    },
  });
  useEffect(() => {
    // When editing, populate form with existing data
    reset({
      userName: edit?.userName || '',
      email: edit?.email || '',
      group: edit?.group || '',
      // Add other fields from edit object as needed
      // Make sure to match the FormData interface
      gender: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
      maritalStatus: '',
      nationality: '',
      facebook: '',
      address: '',
      numberOfPurchases: '',
      lowestSpend: '',
      highestSpend: '',
      avgSpend: '',
      note: '',
    });
  }, [edit, reset, open]); // Add 'open' to ensure reset h
  // Use useFieldArray for selectedDays
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "selectedDays",
  // });

  // Function to handle day selection changes
  // const handleDayChange = (day: string) => {
  //   const index = fields.findIndex((field) => field.value === day);

  //   if (index >= 0) {
  //     remove(index); // If day is already selected, remove it
  //   } else {
  //     append({ value: day }); // If day is not selected, add it
  //   }
  // };

  const onSubmit: SubmitHandler<FormData | EditType> = () => {
    // eslint-disable-next-line no-console
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
      <PageHeader title={formTitle} hideSearch={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate('customer_details')}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  label={translate('gender')}
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  placeholder={translate('select_gender')}
                  helperText={errors.gender?.message}
                  error={Boolean(errors.gender)}
                />
              )}
            />
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  {...register('userName')}
                  label={translate('customer_name')}
                  helperText={errors.userName?.message}
                  error={Boolean(errors.userName)}
                  placeholder={translate('enter_name')}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate('phone_number')}
                  helperText={errors.phoneNumber?.message}
                  error={Boolean(errors.phoneNumber)}
                  placeholder={translate('enter_phone_number')}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate('email')}
                  helperText={errors.email?.message}
                  error={Boolean(errors.email)}
                  placeholder={translate('enter_email')}
                />
              )}
            />
            <Controller
              name="group"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate('customer_group')}
                  helperText={errors.group?.message}
                  error={Boolean(errors.group)}
                  placeholder={translate('enter_customer_group')}
                />
              )}
            />
          </FormLayout>
        </Box>

        <Box mb={5}>
          <FormLayout cardHeading={translate('additional_information')}>
            <GSDateInput
              id="dateOfBirth"
              label={translate('date_of_birth')}
              error={errors.dateOfBirth?.message}
            />
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  label={translate('marital_status')}
                  options={[
                    { value: 'Married', label: 'Married' },
                    { value: 'Unmarried', label: 'Unmarried' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  placeholder={translate('select_marital_status')}
                  helperText={errors.maritalStatus?.message}
                  error={Boolean(errors.maritalStatus)}
                />
              )}
            />
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate('nationality')}
                  helperText={errors.nationality?.message}
                  error={Boolean(errors.nationality)}
                  placeholder={translate('enter_nationality')}
                />
              )}
            />
            <Controller
              name="facebook"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate('facebook')}
                  helperText={errors.facebook?.message}
                  error={Boolean(errors.facebook)}
                  placeholder={translate('enter_facebook')}
                />
              )}
            />
            {/* Other form fields */}
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
    </Drawer>
  );
};

export default CustomerForm;
