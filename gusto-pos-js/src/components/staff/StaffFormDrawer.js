import Drawer from '@mui/material/Drawer';
import React, { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import * as z from 'zod';


import PageHeader from '@/components/widgets/headers/PageHeader';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSCard from '@/components/widgets/cards/GSCard';
import { Box, Checkbox, FormControlLabel, Stack } from '@mui/material';
import GSActionButton from '@/components/widgets/buttons/GSActionButton';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import OtpInput from '@/components/widgets/otpBox/GSOTPInput';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';












































const MockStaffFormData = [
{ label: 'Velvet Basil', value: 'velvetBasil' },
{ label: 'Chai Chee', value: 'chaiChee' }];


const GenderData = [
{ value: 'Male', label: 'Male' },
{ value: 'Female', label: 'Female' },
{ value: 'Other', label: 'Other' }];


const RoleData = [
{ value: 'Option 1', label: 'Option 1' },
{ value: 'Option 2', label: 'Option 2' },
{ value: 'Option 3', label: 'Option 3' }];


const MaritalStatusOptions = [
{ value: 'Single', label: 'Single' },
{ value: 'Married', label: 'Married' }];


const generateZodSchema = (translate) => {
  return z.object({
    gender: z.string().min(1, translate('gender_required')),
    userName: z.string().min(1, translate('staff_name_required')),
    phone: z.string().min(1, translate('phone_number_required')),
    email: z.string().email(translate('invalid_email')),
    dateOfBirth: z.date().max(new Date(), translate('date_of_birth_past')),
    maritalStatus: z.string().min(1, translate('marital_status_required')),
    nationality: z.string().min(1, translate('nationality_required')),
    rate: z.string().min(1, translate('rate_required')),
    minimumWorkingHour: z.string().min(1, translate('minimum_working_hour_required')),
    salesCommissionPercentage: z.string().min(1, translate('sales_commission_required')),
    maxSalesDiscountPercentage: z.string().min(1, translate('max_sales_required')),
    facebook: z.string().optional(),
    linkedIn: z.string().optional(),
    twitter: z.string().optional(),
    address: z.string().min(1, translate('address_required')),
    accountHolderName: z.string().min(1, translate('account_holder_name_required')),
    accountNumber: z.string().min(1, translate('account_number_required')),
    bankName: z.string().min(1, translate('bank_name_required')),
    branch: z.string().min(1, translate('branch_required'))
  });
};
const StaffForm = ({
  open,
  onClose,
  formTitle,

  edit,
  setEdit
}) => {
  const { translate } = useLocalization();
  const otpInputRef = useRef(null);
  const schema = generateZodSchema(translate);
  // console.log(edit?.username,formTitle,'editkkk',formTitle === "Edit Staff");

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: edit?.userName || '',
      // name:  '',
      gender: 'Male',
      email: '',
      role: 'Option 1',
      phone: '',
      rate: '',
      minimumWorkingHour: '',
      salesCommissionPercentage: '',
      maxSalesDiscountPercentage: '',
      dateOfBirth: null,
      maritalStatus: 'Single',
      nationality: '',
      facebook: '',
      linkedIn: '',
      twitter: '',
      address: '',
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      branch: ''
    }
  });
  useEffect(() => {
    reset({
      userName: edit?.userName || '',
      email: edit?.email || '',
      role: edit?.role || 'Option 1',
      phone: edit?.phone || ''
    });
  }, [edit, reset]);

  const onSubmit = () => {};

  const handleCopyToClipboard = async () => {
    if (otpInputRef.current) {
      const otpValue = otpInputRef.current.getValue(); // Get OTP value using the ref
      await navigator.clipboard.writeText(otpValue); // Copy OTP to clipboard
      alert('OTP copied to clipboard!'); // Optionally set success message
    }
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
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 }
      }}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader title={formTitle} hideSearch={true} />
        <FormLayout cardHeading="Staff Details">
          <Controller
            control={control}
            name="userName"
            render={({ field }) =>
            <GSTextInput
              {...register('userName')}
              label={translate('staff_name')}
              value={String(field.value)} // Ensure it's a string
              helperText={
              typeof errors.userName === 'object' ?
              errors.userName?.message :
              errors.userName || ''
              }
              error={Boolean(errors.userName)}
              placeholder={translate('enter_name')} />

            } />

          <Controller
            name="gender"
            control={control}
            render={({ field }) =>
            <GSSelectInput
              {...field}
              label={translate('gender')}
              // Pass type as "theme" to enable primary color styling
              // Ensures placeholder text color is primary
              options={GenderData}
              placeholder={translate('select_gender')}
              helperText={errors.gender?.message}
              error={Boolean(errors.gender)} />

            } />


          <Controller
            control={control}
            name="email"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('email')}
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
              placeholder={translate('enter_email')} />

            } />

          <Controller
            name="role"
            control={control}
            render={({ field }) =>
            <GSSelectInput
              {...field}
              label={translate('role')}
              options={RoleData}
              placeholder={translate('select_role')}
              helperText={errors.role?.message}
              error={Boolean(errors.role)} />

            } />


          <Controller
            control={control}
            name="phone"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('phone_number')}
              helperText={errors.phone?.message}
              error={Boolean(errors.phone)}
              placeholder={translate('enter_phone_number')} />

            } />

        </FormLayout>
        <GSCard heading="Outlets">
          <Stack sx={{ padding: '30px' }}>
            {MockStaffFormData.map((item) => {
              return (
                <FormControlLabel
                  key={item.label}
                  control={<Checkbox defaultChecked />}
                  label={item.label} />);


            })}
          </Stack>
        </GSCard>
        <GSCard heading="POS PIN">
          <Stack sx={{ padding: '30px' }} flexDirection="row" alignItems="center">
            <OtpInput ref={otpInputRef} defaultValue="1234" />
            <GSActionButton
              label={translate('copy_to_clip')}
              variant="contained"
              onClick={handleCopyToClipboard} />

          </Stack>
        </GSCard>
        <FormLayout cardHeading={translate('salary')}>
          <Controller
            control={control}
            name="rate"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('rate')}
              helperText={errors.rate?.message}
              error={Boolean(errors.rate)}
              placeholder={translate('enter_rate')} />

            } />

          <Controller
            control={control}
            name="minimumWorkingHour"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('minimum_working_hour')}
              helperText={errors.minimumWorkingHour?.message}
              error={Boolean(errors.minimumWorkingHour)}
              placeholder={translate('enter_minimum_working_hour')} />

            } />


          <Controller
            control={control}
            name="salesCommissionPercentage"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('sales_commission_percentage')}
              helperText={errors.salesCommissionPercentage?.message}
              error={Boolean(errors.salesCommissionPercentage)}
              placeholder={translate('enter_sales_commission_percentage')} />

            } />


          <Controller
            control={control}
            name="maxSalesDiscountPercentage"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('max_sales_discount_percentage')}
              helperText={errors.maxSalesDiscountPercentage?.message}
              error={Boolean(errors.maxSalesDiscountPercentage)}
              placeholder={translate('enter_max_sale')} />

            } />

        </FormLayout>
        <FormLayout cardHeading={translate('additional_information')}>
          <GSDateInput
            id="dateOfBirth"
            label={translate('date_of_birth')}
            error={errors.dateOfBirth?.message} />

          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) =>
            <GSSelectInput
              {...field}
              label={translate('marital_status')}
              options={MaritalStatusOptions}
              placeholder={translate('select_marital_status')}
              helperText={errors.maritalStatus?.message}
              error={Boolean(errors.maritalStatus)} />

            } />


          <Controller
            control={control}
            name="nationality"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('nationality')}
              helperText={errors.nationality?.message}
              error={Boolean(errors.nationality)}
              placeholder={translate('enter_nationality')} />

            } />

          <Controller
            control={control}
            name="facebook"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('facebook')}
              helperText={errors.facebook?.message}
              error={Boolean(errors.facebook)}
              placeholder={translate('enter_facebook')} />

            } />


          <Controller
            control={control}
            name="linkedIn"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('linkedIn')}
              helperText={errors.linkedIn?.message}
              error={Boolean(errors.linkedIn)}
              placeholder={translate('enter_linkedIn')} />

            } />

          <Controller
            control={control}
            name="twitter"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('twitter')}
              helperText={errors.twitter?.message}
              error={Boolean(errors.twitter)}
              placeholder={translate('enter_twitter')} />

            } />


          <Controller
            control={control}
            name="address"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('address')}
              helperText={errors.address?.message}
              error={Boolean(errors.address)}
              placeholder={translate('enter_address')} />

            } />

        </FormLayout>
        <FormLayout cardHeading={translate('bank_details')}>
          <Controller
            control={control}
            name="accountHolderName"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('account_holder_name')}
              helperText={errors.accountHolderName?.message}
              error={Boolean(errors.accountHolderName)}
              placeholder={translate('enter_account_holder_name')} />

            } />

          <Controller
            control={control}
            name="accountNumber"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('account_number')}
              helperText={errors.accountNumber?.message}
              error={Boolean(errors.accountNumber)}
              placeholder={translate('enter_account_number')} />

            } />


          <Controller
            control={control}
            name="bankName"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('bank_name')}
              helperText={errors.bankName?.message}
              error={Boolean(errors.bankName)}
              placeholder={translate('enter_bank_name')} />

            } />

          <Controller
            control={control}
            name="branch"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('branch')}
              helperText={errors.branch?.message}
              error={Boolean(errors.branch)}
              placeholder={translate('enter_branch_name')} />

            } />

        </FormLayout>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <CustomButton variant="outlined" type="button" sx={{ mr: 2 }} onClick={handleClose}>
            {translate('cancel')}
          </CustomButton>

          <CustomButton variant="contained" type="submit">
            {translate('save')}
          </CustomButton>
        </Box>
      </form>
    </Drawer>);

};

export default StaffForm;