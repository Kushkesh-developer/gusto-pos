"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
  { label: "Bukit Batok", value: "bukitBatok" },
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

const generateZodSchema = (translate: any) => {
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
    sales_commision_percentage: z
      .string()
      .min(1, translate("sales_commision_required")),
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

const StaffForm: React.FC = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    register,
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
      sales_commision_percentage: "",
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

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  const handleOtpChange = (otp: string) => {
    console.log("Entered OTP:", otp);
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
              placeholder="Enter name"
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
              options={GenderData}
              placeholder="Select gender"
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
              placeholder="Enter email"
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
              placeholder="Select role"
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
              placeholder="Enter phone number"
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
          <OtpInput onChange={handleOtpChange} defaultValue="1234" />
          <GSActionButton
            label="Copy to Clipboard"
            variant="contained"
            onClick={() => {}}
          />
        </Stack>
      </GSCard>
      <FormLayout cardHeading="Salary">
        <Controller
          control={control}
          name="rate"
          render={({ field }) => (
            <TextInput
              {...field}
              label="Rate"
              helperText={errors.rate?.message}
              error={Boolean(errors.rate)}
              placeholder="Enter rate"
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
              placeholder="Enter minimum working hour"
            />
          )}
        />

        <Controller
          control={control}
          name="sales_commision_percentage"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("sales_commision_percentage")}
              helperText={errors.sales_commision_percentage?.message}
              error={Boolean(errors.sales_commision_percentage)}
              placeholder="Enter sales commision percentage"
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
              placeholder="Enter max sales discount percentage"
            />
          )}
        />
      </FormLayout>
      <FormLayout cardHeading="Additional Information">
        <DateInput
          id="dateOfBirth"
          label={translate("date_of_birth")}
          register={register}
          error={errors.date_of_birth?.message}
        />
        <Controller
          name="marital_status"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              label={translate("gender")}
              options={MaritalStatusOptions}
              placeholder="Select marital status"
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
              placeholder="Enter nationality"
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
              placeholder="Enter facebook"
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
              placeholder="Enter linkedIn"
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
              placeholder="Enter twitter"
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
              placeholder="Enter address"
            />
          )}
        />
      </FormLayout>
      <FormLayout cardHeading="Bank Details">
        
          <Controller
            control={control}
            name="account_holder_name"
            render={({ field }) => (
              <TextInput
                {...field}
                label={translate("account_holder_name")}
                helperText={errors.account_holder_name?.message}
                error={Boolean(errors.account_holder_name)}
                placeholder="Enter account holder's name"
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
                placeholder="Enter account number"
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
                placeholder="Enter bank name"
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
                placeholder="Enter branch name"
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
