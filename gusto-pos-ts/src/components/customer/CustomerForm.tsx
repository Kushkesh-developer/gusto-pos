"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, Button } from "@mui/material";

import SelectInput from "../widgets/inputs/GSSelectInput";
import TextInput from "../widgets/inputs/GSTextInput";
import DateInput from "../widgets/inputs/GSDateInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
interface FormData {
  gender: string;
  name: string;
  phoneNumber: string;
  email: string;
  customerGroup: string;
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
  // ... other fields
}
// Zod schema generation function with localized error messages
const generateZodSchema = (translate: any) => {
  return z.object({
    gender: z.string().min(1, translate("gender_required")),
    name: z.string().min(1, translate("customer_name_required")),
    phoneNumber: z.string().min(1, translate("phone_number_required")),
    email: z.string().email(translate("invalid_email")),
    customerGroup: z.string().min(1, translate("customer_group_required")),
    dateOfBirth: z.date().max(new Date(), translate("date_of_birth_past")),
    maritalStatus: z.string().min(1, translate("marital_status_required")),
    nationality: z.string().min(1, translate("nationality_required")),
    facebook: z.string().optional(),
    linkedIn: z.string().optional(),
    twitter: z.string().optional(),
    address: z.string().min(1, translate("address_required")),
    numberOfPurchases: z
      .string()
      .min(1, translate("number_of_purchases_required")),
    lowestSpend: z.string().min(1, translate("lowest_spend_required")),
    highestSpend: z.string().min(1, translate("highest_spend_required")),
    avgSpend: z.string().min(1, translate("average_spend_required")),
    note: z.string().optional(),
  });
};

const CustomerForm = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: "Male",
      name: "",
      phoneNumber: "",
      email: "",
      customerGroup: "",
      dateOfBirth: new Date(),
      maritalStatus: "",
      nationality: "",
      facebook: "",
      linkedIn: "",
      twitter: "",
      address: "",
      numberOfPurchases: "",
      lowestSpend: "",
      highestSpend: "",
      avgSpend: "",
      note: "",
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        maxWidth: "1140px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate("customer_details")}>
            <React.Fragment>
              <SelectInput
                id="gender"
                label={translate("gender")}
                options={["Male", "Female", "Other"]}
                register={register}
                error={errors.gender?.message}
              />

              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("customer_name")}
                    helperText={errors.name?.message}
                    error={Boolean(errors.name)}
                    placeholder="Enter Result Value"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("phone_number")}
                    helperText={errors.phoneNumber?.message}
                    error={Boolean(errors.phoneNumber)}
                    placeholder="Enter Phone Number"
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
                    placeholder="Enter Email"
                  />
                )}
              />
            </React.Fragment>

            <React.Fragment>
              <Controller
                control={control}
                name="customerGroup"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("customer_group")}
                    helperText={errors.customerGroup?.message}
                    error={Boolean(errors.customerGroup)}
                    placeholder="Enter Customer Group"
                  />
                )}
              />
            </React.Fragment>
          </FormLayout>
        </Box>
        <Box mb={5}>
          <FormLayout cardHeading={translate("additional_information")}>
            <React.Fragment>
              <DateInput
                id="dateOfBirth"
                label={translate("date_of_birth")}
                register={register}
                error={errors.dateOfBirth?.message}
              />
              <SelectInput
                id="maritalStatus"
                label={translate("marital_status")}
                options={["Single", "Married"]}
                register={register}
                error={errors.maritalStatus?.message}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="nationality"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("nationality")}
                    helperText={errors.nationality?.message}
                    error={Boolean(errors.nationality)}
                    placeholder="Enter Nationality"
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
                    placeholder="Enter Facebook"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="linkedIn"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("linkedIn")}
                    helperText={errors.linkedIn?.message}
                    error={Boolean(errors.linkedIn)}
                    placeholder="Enter LinkedIn"
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
                    placeholder="Enter Twitter"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("address")}
                    helperText={errors.address?.message}
                    error={Boolean(errors.address)}
                    placeholder="Enter Address"
                  />
                )}
              />
              <Controller
                control={control}
                name="numberOfPurchases"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("number_of_purchases")}
                    helperText={errors.numberOfPurchases?.message}
                    error={Boolean(errors.numberOfPurchases)}
                    placeholder="Enter numberOfPurchases"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="lowestSpend"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("lowest_spend")}
                    helperText={errors.lowestSpend?.message}
                    error={Boolean(errors.lowestSpend)}
                    placeholder="Enter LowestSpend"
                  />
                )}
              />
              <Controller
                control={control}
                name="highestSpend"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("highest_spend")}
                    helperText={errors.highestSpend?.message}
                    error={Boolean(errors.highestSpend)}
                    placeholder="Enter HighestSpend"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="avgSpend"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("average_spend")}
                    helperText={errors.avgSpend?.message}
                    error={Boolean(errors.avgSpend)}
                    placeholder="Enter AvgSpend"
                  />
                )}
              />
              <Controller
                control={control}
                name="note"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("note")}
                    helperText={errors.note?.message}
                    error={Boolean(errors.note)}
                    placeholder="Enter Note"
                  />
                )}
              />
            </React.Fragment>
          </FormLayout>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="outlined"
              type="button"
              sx={{ mr: 2, color: "red", borderColor: "red" }}
            >
              {translate("cancel")}
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "red" }}
            >
              {translate("save")}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerForm;
