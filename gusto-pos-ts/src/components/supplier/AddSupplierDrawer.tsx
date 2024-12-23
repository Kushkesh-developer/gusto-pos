'use client';
import Drawer from '@mui/material/Drawer';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import { TranslateFn } from '@/types/localization-types';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
type EditType = {
  id?: string | number;
  email?: string;
  [key: string]: unknown;
  group: string;
  name?: string;
  phone?: string;
  companyName?: string;
  officeTelephone?: string;
  contactPerson: string;
};
interface FormData {
  contactPerson: string;
  companyName: string;
  phone: string;
  email: string;
  officeTelephone: string;
  fax: string;
  postalCode: string;
  address: string;
  // ... other fields
}
type AddSupplierDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<EditType | null>>;
};
// Zod schema generation function with localized error messages
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    contactPerson: z.string().min(1, translate('company_person_name_required')),
    companyName: z.string().min(1, translate('company_name_required')),
    phone: z.string().min(1, translate('phone_number_required')),
    email: z.string().email(translate('invalid_email')),
    officeTelephone: z
      .string({ required_error: translate('office_telephone_required') })
      .min(1, translate('office_telephone_required')),
    fax: z.string({ required_error: translate('fax_required') }).min(1, translate('fax_required')),
    address: z
      .string({ required_error: translate('address_required') })
      .min(1, translate('address_required')),
    postalCode: z
      .string({ required_error: translate('postal_code_required') })
      .min(1, translate('postal_code_required')),
  });
};

const AddSupplierDrawer = ({ open, onClose, formTitle, edit, setEdit }: AddSupplierDrawerProps) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contactPerson: '',
      companyName: '',
      phone: '',
      email: '',
      officeTelephone: '',
      postalCode: '',
      address: '',
    },
  });
  useEffect(() => {
    reset({
      contactPerson: edit?.contactPerson || '',
      // gender: edit?.gender || 'Male',
      companyName: edit?.companyName || '',
      phone: edit?.phone || '',
      email: edit?.email || '',
      officeTelephone: edit?.officeTelephone || '',
    });
  }, [edit, reset]);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form submitted with data:', data);
    // Add any necessary submission logic here
  };
  const handleClose = () => {
    reset({
      contactPerson: '',
      companyName: '',
      phone: '',
      email: '',
      officeTelephone: '',
      postalCode: '',
      address: '',
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
      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} showMobileView={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate('supplier_details')}>
            <Controller
              control={control}
              name="companyName"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('company_name')}
                  helperText={errors.companyName?.message}
                  error={Boolean(errors.companyName)}
                  placeholder={translate('enter_company_name')} // Updated placeholder
                />
              )}
            />
            <Controller
              control={control}
              name="contactPerson"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('company_person_name')}
                  helperText={errors.contactPerson?.message}
                  error={Boolean(errors.contactPerson)}
                  placeholder={translate('Enter Name')} // Updated placeholder
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('phone_number')}
                  helperText={errors.phone?.message}
                  error={Boolean(errors.phone)}
                  placeholder={translate('Enter Phone Number')} // Updated placeholder// Updated placeholder
                />
              )}
            />
            <Controller
              control={control}
              name="officeTelephone"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('office_telephone')}
                  helperText={errors.officeTelephone?.message}
                  error={Boolean(errors.officeTelephone)}
                  placeholder={translate('Enter Office Telephone')} // Updated placeholder
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('email')}
                  helperText={errors.email?.message}
                  error={Boolean(errors.email)}
                  placeholder={translate('Enter Email')} // Updated placeholder
                />
              )}
            />
            <Controller
              control={control}
              name="fax"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('fax')}
                  helperText={errors.fax?.message}
                  error={Boolean(errors.fax)}
                  placeholder={translate('Enter Fax')} // Updated placeholder
                />
              )}
            />
            <Controller
              control={control}
              name="postalCode"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('postal_code')}
                  helperText={errors.postalCode?.message}
                  error={Boolean(errors.postalCode)}
                  placeholder={translate('Enter Postal Code')} //
                />
              )}
            />
          </FormLayout>
        </Box>
        <Box mb={5}>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }} onClick={handleClose}>
              {translate('cancel')}
            </CustomButton>

            <CustomButton variant="contained" type="submit">
              {translate('save')}
            </CustomButton>
          </Box>
        </Box>
      </form>
    </Drawer>
  );
};

export default AddSupplierDrawer;
