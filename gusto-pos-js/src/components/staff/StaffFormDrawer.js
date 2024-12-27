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
import { Box, Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import GSActionButton from '@/components/widgets/buttons/GSActionButton';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import OtpInput from '@/components/widgets/otpBox/GSOTPInput';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';

import { useDrawerContext } from '@/context/DrawerProvider';
import { outlets } from '@/mock/common';














































const MockStaffFormData = [
{ label: 'Velvet Basil', value: 'velvetBasil' },
{ label: 'Chai Chee', value: 'chaiChee' }];


const GenderData = [
{ value: 'Male', label: 'Male' },
{ value: 'Female', label: 'Female' },
{ value: 'Other', label: 'Other' }];


const RoleData = [
{ value: 'owner', label: 'Owner' },
{ value: 'cashier', label: 'Cashier' },
{ value: 'manager', label: 'Manager' }];


const MaritalStatusOptions = [
{ value: 'Single', label: 'Single' },
{ value: 'Married', label: 'Married' }];


const generateZodSchema = (translate) => {
  return z.object({
    gender: z.
    string({ required_error: translate('gender_is_a_required_field_please_select_your_gender') }).
    min(1, { message: translate('gender_is_a_required_field_please_select_your_gender') }),
    userName: z.
    string({ required_error: translate('staff_name_required') }).
    min(1, translate('staff_name_required')),
    phone: z.
    string({ required_error: translate('phone_number_required') }).
    min(1, translate('phone_number_required')),
    email: z.
    string({ required_error: translate('invalid_email') }).
    email(translate('invalid_email')),
    dateOfBirth: z.
    date({ required_error: translate('date_of_birth_past') }).
    max(new Date(), { message: translate('date_of_birth_past') }),
    role: z.
    string({ required_error: translate('select_role_is_must') }).
    min(1, translate('select_role_is_must')),
    maritalStatus: z.
    string({ required_error: translate('marital_status_required') }).
    min(1, translate('marital_status_required')),
    nationality: z.
    string({ required_error: translate('nationality_required') }).
    min(1, translate('nationality_required')),
    rate: z.
    string({ required_error: translate('rate_required') }).
    min(1, translate('rate_required')),
    minimumWorkingHour: z.
    string({ required_error: translate('minimum_working_hour_required') }).
    min(1, translate('minimum_working_hour_required')),
    salesCommissionPercentage: z.
    string({ required_error: translate('sales_commission_required') }).
    min(1, translate('sales_commission_required')),
    maxSalesDiscountPercentage: z.
    string({ required_error: translate('max_sales_required') }).
    min(1, translate('max_sales_required')),
    facebook: z.string().optional(),
    linkedIn: z.string().optional(),
    twitter: z.string().optional(),
    address: z.
    string({ required_error: translate('address_required') }).
    min(1, translate('address_required')),
    accountHolderName: z.
    string({ required_error: translate('account_holder_name_required') }).
    min(1, translate('account_holder_name_required')),
    accountNumber: z.
    string({ required_error: translate('account_number_required') }).
    min(1, translate('account_number_required')),
    bankName: z.
    string({ required_error: translate('bank_name_required') }).
    min(1, translate('bank_name_required')),
    branch: z.
    string({ required_error: translate('branch_required') }).
    min(1, translate('branch_required')),
    outlets: z.record(z.boolean())
  });
};
const StaffForm = ({ open, onClose, formTitle, edit, setEdit }) => {
  const { translate } = useLocalization();
  const otpInputRef = useRef(null);
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  // console.log(edit?.username,formTitle,'editkkk',formTitle === "Edit Staff");
  const defaultValues = {
    userName: edit?.userName || '',
    // name:  '',
    gender: '',
    email: '',
    role: '',
    phone: '',
    rate: '',
    minimumWorkingHour: '',
    salesCommissionPercentage: '',
    maxSalesDiscountPercentage: '',
    dateOfBirth: new Date(),
    maritalStatus: 'Single',
    nationality: '',
    facebook: '',
    linkedIn: '',
    twitter: '',
    address: '',
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    branch: '',
    outlets: outlets.reduce(
      (acc, outlet) => {
        acc[outlet.value] = false; // Set initial value for each outlet as false
        return acc;
      },
      {}
    )
  };
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (edit) {
      reset({
        userName: edit?.userName || '',
        email: edit?.email || '',
        role: edit?.role || '',
        phone: edit?.phone || ''
      });
    } else {
      reset({
        userName: '',
        // name:  '',
        gender: '',
        email: '',
        role: '',
        phone: '',
        rate: '',
        minimumWorkingHour: '',
        salesCommissionPercentage: '',
        maxSalesDiscountPercentage: '',
        dateOfBirth: new Date(),
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
      });
    }
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
    reset({
      ...defaultValues
    });
    setEdit(null); // Reset `editMode`
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
          p: 2
        }
      }}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader
          title={formTitle}
          hideSearch={true}
          onClose={handleClose}
          showMobileView={true} />

        <FormLayout cardHeading="Staff Details">
          <Controller
            control={control}
            name="userName"
            render={({ field }) =>
            <GSTextInput
              requiredMark
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
              requiredMark
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
              requiredMark
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
              requiredMark
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
              requiredMark
              label={translate('phone_number')}
              helperText={errors.phone?.message}
              error={Boolean(errors.phone)}
              placeholder={translate('enter_phone_number')} />

            } />

        </FormLayout>
        <Box mb={5}>
          <FormLayout cardHeading={translate('apply_to_these_outlet')}>
            {outlets.map((outlet) =>
            <Controller
              key={outlet.value}
              name={`outlets.${outlet.value}`}
              control={control}
              render={({ field }) =>
              <FormGroup>
                    <FormControlLabel
                  control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)} />

                  }
                  label={translate(outlet.label)} />

                  </FormGroup>
              } />

            )}
          </FormLayout>
        </Box>
        <GSCard heading="POS PIN">
          <Stack
            sx={{
              padding: '30px 10px',
              gap: '6px',
              display: 'flex',
              justifyContent: { md: 'center', xs: 'center', lg: 'unset' },
              flexWrap: 'wrap'
            }}
            flexDirection="row"
            alignItems="center">

            <OtpInput ref={otpInputRef} defaultValue="1234" />
            <GSActionButton
              label={translate('copy_to_clip')}
              variant="contained"
              onClick={handleCopyToClipboard}
              sx={{
                marginTop: { xs: '8px' }
              }} />

          </Stack>
        </GSCard>
        <FormLayout cardHeading={translate('salary')}>
          <Controller
            control={control}
            name="rate"
            render={({ field }) =>
            <GSTextInput
              {...field}
              requiredMark
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
              requiredMark
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
              requiredMark
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
              requiredMark
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
              requiredMark
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
              requiredMark
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
              requiredMark
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
              requiredMark
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
              requiredMark
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