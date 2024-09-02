"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, Button } from "@mui/material";

import FormLayout from "../widgets/inputs/GSFormCardLayout";
import SelectInput from "../widgets/inputs/GSSelectInput";
import TextInput from "../widgets/inputs/GSTextInput";
import DateInput from "../widgets/inputs/GSDateInput";
import { useLocalization } from "@/context/LocalizationProvider";

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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: "Male",
      name: "",
      phoneNumber: "",
      email: "",
      customerGroup: "",
      dateOfBirth: null,
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
          <FormLayout heading={translate("customer_details")}>
            <React.Fragment>
              <SelectInput
                id="gender"
                label={translate("gender")}
                options={["Male", "Female", "Other"]}
                register={register}
                error={errors.gender?.message}
              />
              <TextInput
                id="name"
                label={translate("customer_name")}
                register={register}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
                
              />
            </React.Fragment>
            <React.Fragment>
              <TextInput
                id="phoneNumber"
                label={translate("phone_number")}
                register={register}
                helperText={errors.phoneNumber?.message}
                error={Boolean(errors.phoneNumber)}
              />
              <TextInput
                id="email"
                label={translate("email")}
                register={register}
                helperText={errors.email?.message}
                error={Boolean(errors.email)}
              />
            </React.Fragment>
            <React.Fragment>
              <TextInput
                id="customerGroup"
                label={translate("customer_group")}
                register={register}
                helperText={errors.customerGroup?.message}
                error={Boolean(errors.customerGroup)}
              />
            </React.Fragment>
          </FormLayout>
        </Box>
        <Box mb={5}>
          <FormLayout heading={translate("additional_information")}>
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
              <TextInput
                id="nationality"
                label={translate("nationality")}
                register={register}
                helperText={errors.nationality?.message}
                error={Boolean(errors.nationality)}
              />
              <TextInput
                id="facebook"
                label={translate("facebook")}
                register={register}
                helperText={errors.facebook?.message}
                error={Boolean(errors.facebook)}
              />
            </React.Fragment>
            <React.Fragment>
              <TextInput
                id="linkedIn"
                label={translate("linkedIn")}
                register={register}
                helperText={errors.linkedIn?.message}
                error={Boolean(errors.linkedIn)}
              />
              <TextInput
                id="twitter"
                label={translate("twitter")}
                register={register}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
              />
            </React.Fragment>
            <React.Fragment>
              <TextInput
                id="address"
                label={translate("address")}
                register={register}
                helperText={errors.address?.message}
                error={Boolean(errors.address)}
              />
              <TextInput
                id="numberOfPurchases"
                label={translate("number_of_purchases")}
                register={register}
                helperText={errors.numberOfPurchases?.message}
                error={Boolean(errors.numberOfPurchases)}
              />
            </React.Fragment>
            <React.Fragment>
              <TextInput
                id="lowestSpend"
                label={translate("lowest_spend")}
                register={register}
                helperText={errors.lowestSpend?.message}
                error={Boolean(errors.lowestSpend)}
              />
              <TextInput
                id="highestSpend"
                label={translate("highest_spend")}
                register={register}
                helperText={errors.highestSpend?.message}
                error={Boolean(errors.highestSpend)}
              />
            </React.Fragment>
            <React.Fragment>
              <TextInput
                id="avgSpend"
                label={translate("average_spend")}
                register={register}
                helperText={errors.avgSpend?.message}
                error={Boolean(errors.avgSpend)}
              />
              <TextInput
                id="note"
                label={translate("note")}
                register={register}
                helperText={errors.note?.message}
                error={Boolean(errors.note)}
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
