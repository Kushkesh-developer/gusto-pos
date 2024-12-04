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

type EditType = {
  username?: string;
  id?: string | number;
  email?: string;
  [key: string]: unknown;
  group: string;
  name?: string;
  phone?: string;
  companyName?: string;
  contactPerson: string;
};
interface FormData {
  contactPerson: string;
  companyName: string;
  phone: string;
  email: string;
  office_telephone: string;
  fax: string;
  postal_code: string;
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
    office_telephone: z.string().min(1, translate('office_telephone_required')),
    fax: z.string().min(1, translate('fax_required')),
    address: z.string().min(1, translate('address_required')),
    postal_code: z.string().min(1, translate('postal_code_required')),
  });
};

const AddSupplierDrawer = ({ open, onClose, formTitle, edit, setEdit }: AddSupplierDrawerProps) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

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
      office_telephone: '',
      postal_code: '',
      address: '',
    },
  });
  useEffect(() => {
    console.log('hello', formTitle, edit?.username);

    reset({
      contactPerson: edit?.contactPerson || '',
      // gender: edit?.gender || 'Male',
      companyName: edit?.companyName || '',
      phone: edit?.phone || '',
      email: edit?.email || '',
    });
  }, [edit, reset]);
  const onSubmit: SubmitHandler<FormData> = () => {};
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
      <PageHeader title={formTitle} hideSearch={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate('supplier_details')}>
            <Controller
              control={control}
              name="companyName"
              render={({ field }) => (
                <GSTextInput
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
              name="office_telephone"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate('office_telephone')}
                  helperText={errors.office_telephone?.message}
                  error={Boolean(errors.office_telephone)}
                  placeholder={translate('Enter Office Telephone')} // Updated placeholder
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <GSTextInput
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
              name="postal_code"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate('postal_code')}
                  helperText={errors.postal_code?.message}
                  error={Boolean(errors.postal_code)}
                  placeholder={translate('Enter Postal Code')} //
                />
              )}
            />
          </FormLayout>
        </Box>
        <Box mb={5}>
          <Box display="flex" justifyContent="flex-end" mt={3} onClick={handleClose}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
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
