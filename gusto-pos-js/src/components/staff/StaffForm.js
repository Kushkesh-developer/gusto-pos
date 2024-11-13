"use client";
// old one staff form
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalization } from "@/context/LocalizationProvider";
import * as z from "zod";

import FormLayout from "../widgets/forms/GSFormCardLayout";
import SelectInput from "../widgets/inputs/GSSelectInput";
import TextInput from "../widgets/inputs/GSTextInput";
import GSCard from "../widgets/cards/GSCard";
import { Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import GSActionButton from "../widgets/buttons/GSActionButton";
import DateInput from "../widgets/inputs/GSDateInput";
import OtpInput from "../widgets/otpBox/GSOTPInput";
import CustomButton from "../widgets/buttons/GSCustomButton";

const MockStaffFormData = [
  { label: "Velvet Basil", value: "velvetBasil" },
  { label: "Chai Chee", value: "chaiChee" },
];

const GenderData = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const RoleData = [
  { value: "Option 1", label: "Option 1" },
  { value: "Option 2", label: "Option 2" },
  { value: "Option 3", label: "Option 3" },
];

const MaritalStatusOptions = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
];

const generateZodSchema = (translate) => {
  return z.object({
    gender: z.string().min(1, translate("gender_required")),
    name: z.string().min(1, translate("staff_name_required")),
    phone_number: z.string().min(1, translate("phone_number_required")),
    email: z.string().email(translate("invalid_email")),
    date_of_birth: z.date().max(new Date(), translate("date_of_birth_past")),
    marital_status: z.string().min(1, translate("marital_status_required")),
    nationality: z.string().min(1, translate("nationality_required")),
    rate: z.string().min(1, translate("rate_required")),
    minimum_working_hour: z
      .string()
      .min(1, translate("minimum_working_hour_required")),
    sales_commission_percentage: z
      .string()
      .min(1, translate("sales_commission_required")),
    max_sales_discount_percentage: z
      .string()
      .min(1, translate("max_sales_required")),
    facebook: z.string().optional(),
    linkedIn: z.string().optional(),
    twitter: z.string().optional(),
    address: z.string().min(1, translate("address_required")),
    account_holder_name: z
      .string()
      .min(1, translate("account_holder_name_required")),
    account_number: z.string().min(1, translate("account_number_required")),
    bank_name: z.string().min(1, translate("bank_name_required")),
    branch: z.string().min(1, translate("branch_required")),
  });
};

const StaffForm = () => {
  const { translate } = useLocalization();
  const otpInputRef = useRef(null);
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      gender: "Male",
      email: "",
      role: "Option 1",
      phone_number: "",
      rate: "",
      minimum_working_hour: "",
      sales_commission_percentage: "",
      max_sales_discount_percentage: "",
      date_of_birth: null,
      marital_status: "Single",
      nationality: "",
      facebook: "",
      linkedIn: "",
      twitter: "",
      address: "",
      account_holder_name: "",
      account_number: "",
      bank_name: "",
      branch: "",
    },
  });

  const onSubmit = () => {};

  const handleCopyToClipboard = async () => {
    if (otpInputRef.current) {
      const otpValue = otpInputRef.current.getValue(); // Get OTP value using the ref
      await navigator.clipboard.writeText(otpValue); // Copy OTP to clipboard
      alert("OTP copied to clipboard!"); // Optionally set success message
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout cardHeading="Staff Details">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("staff_name")}
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
              placeholder={translate("enter_name")}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              label={translate("gender")}
              // Pass type as "theme" to enable primary color styling
              // Ensures placeholder text color is primary
              options={GenderData}
              placeholder={translate("select_gender")}
              helperText={errors.gender?.message}
              error={Boolean(errors.gender)}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("email")}
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
              placeholder={translate("enter_email")}
            />
          )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              label={translate("role")}
              options={RoleData}
              placeholder={translate("select_role")}
              helperText={errors.role?.message}
              error={Boolean(errors.role)}
            />
          )}
        />

        <Controller
          control={control}
          name="phone_number"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("phone_number")}
              helperText={errors.phone_number?.message}
              error={Boolean(errors.phone_number)}
              placeholder={translate("enter_phone_number")}
            />
          )}
        />
      </FormLayout>
      <GSCard heading="Outlets">
        <Stack sx={{ padding: "30px" }}>
          {MockStaffFormData.map((item) => {
            return (
              <FormControlLabel
                key={item.label}
                control={<Checkbox defaultChecked />}
                label={item.label}
              />
            );
          })}
        </Stack>
      </GSCard>
      <GSCard heading="POS PIN">
        <Stack sx={{ padding: "30px" }} flexDirection="row" alignItems="center">
          <OtpInput ref={otpInputRef} defaultValue="1234" />
          <GSActionButton
            label={translate("copy_to_clip")}
            variant="contained"
            onClick={handleCopyToClipboard}
          />
        </Stack>
      </GSCard>
      <FormLayout cardHeading={translate("salary")}>
        <Controller
          control={control}
          name="rate"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("rate")}
              helperText={errors.rate?.message}
              error={Boolean(errors.rate)}
              placeholder={translate("enter_rate")}
            />
          )}
        />

        <Controller
          control={control}
          name="minimum_working_hour"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("minimum_working_hour")}
              helperText={errors.minimum_working_hour?.message}
              error={Boolean(errors.minimum_working_hour)}
              placeholder={translate("enter_minimum_working_hour")}
            />
          )}
        />

        <Controller
          control={control}
          name="sales_commission_percentage"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("sales_commission_percentage")}
              helperText={errors.sales_commission_percentage?.message}
              error={Boolean(errors.sales_commission_percentage)}
              placeholder={translate("enter_sales_commission_percentage")}
            />
          )}
        />

        <Controller
          control={control}
          name="max_sales_discount_percentage"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("max_sales_discount_percentage")}
              helperText={errors.max_sales_discount_percentage?.message}
              error={Boolean(errors.max_sales_discount_percentage)}
              placeholder={translate("enter_max_sale")}
            />
          )}
        />
      </FormLayout>
      <FormLayout cardHeading={translate("additional_information")}>
        <DateInput
          id="dateOfBirth"
          label={translate("date_of_birth")}
          error={errors.date_of_birth?.message}
        />

        <Controller
          name="marital_status"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              label={translate("marital_status")}
              options={MaritalStatusOptions}
              placeholder={translate("select_marital_status")}
              helperText={errors.marital_status?.message}
              error={Boolean(errors.marital_status)}
            />
          )}
        />

        <Controller
          control={control}
          name="nationality"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("nationality")}
              helperText={errors.nationality?.message}
              error={Boolean(errors.nationality)}
              placeholder={translate("enter_nationality")}
            />
          )}
        />

        <Controller
          control={control}
          name="facebook"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("facebook")}
              helperText={errors.facebook?.message}
              error={Boolean(errors.facebook)}
              placeholder={translate("enter_facebook")}
            />
          )}
        />

        <Controller
          control={control}
          name="linkedIn"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("linkedIn")}
              helperText={errors.linkedIn?.message}
              error={Boolean(errors.linkedIn)}
              placeholder={translate("enter_linkedIn")}
            />
          )}
        />

        <Controller
          control={control}
          name="twitter"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("twitter")}
              helperText={errors.twitter?.message}
              error={Boolean(errors.twitter)}
              placeholder={translate("enter_twitter")}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("address")}
              helperText={errors.address?.message}
              error={Boolean(errors.address)}
              placeholder={translate("enter_address")}
            />
          )}
        />
      </FormLayout>
      <FormLayout cardHeading={translate("bank_details")}>
        <Controller
          control={control}
          name="account_holder_name"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("account_holder_name")}
              helperText={errors.account_holder_name?.message}
              error={Boolean(errors.account_holder_name)}
              placeholder={translate("enter_account_holder_name")}
            />
          )}
        />

        <Controller
          control={control}
          name="account_number"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("account_number")}
              helperText={errors.account_number?.message}
              error={Boolean(errors.account_number)}
              placeholder={translate("enter_account_number")}
            />
          )}
        />

        <Controller
          control={control}
          name="bank_name"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("bank_name")}
              helperText={errors.bank_name?.message}
              error={Boolean(errors.bank_name)}
              placeholder={translate("enter_bank_name")}
            />
          )}
        />

        <Controller
          control={control}
          name="branch"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("branch")}
              helperText={errors.branch?.message}
              error={Boolean(errors.branch)}
              placeholder={translate("enter_branch_name")}
            />
          )}
        />
      </FormLayout>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
          {translate("cancel")}
        </CustomButton>

        <CustomButton variant="contained" type="submit">
          {translate("save")}
        </CustomButton>
      </Box>
    </form>
  );
};

export default StaffForm;
