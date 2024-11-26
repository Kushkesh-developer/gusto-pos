"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box } from "@mui/material";
import GSSelectInput from "@/components/widgets/inputs/GSSelectInput";
import GSTextInput from "@/components/widgets/inputs/GSTextInput";
import GSDateInput from "@/components/widgets/inputs/GSDateInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "@/components/widgets/forms/GSFormCardLayout";
import CustomButton from "@/components/widgets/buttons/GSCustomButton";

const generateZodSchema = (translate) => {
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
    //   selectedDays: z
    //     .array(z.object({ value: z.string() }))
    //     .min(1, translate("day_required")), // Array of objects with day values
  });
};

const CustomerForm = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: "",
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
      // selectedDays: [], // Initialize as an empty array for selected days
    },
  });

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

  const onSubmit = () => {
    // eslint-disable-next-line no-console
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate("customer_details")}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  label={translate("gender")}
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                  placeholder={translate("select_gender")}
                  helperText={errors.gender?.message}
                  error={Boolean(errors.gender)}
                />
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate("customer_name")}
                  helperText={errors.name?.message}
                  error={Boolean(errors.name)}
                  placeholder={translate("enter_name")}
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate("phone_number")}
                  helperText={errors.phoneNumber?.message}
                  error={Boolean(errors.phoneNumber)}
                  placeholder={translate("enter_phone_number")}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate("email")}
                  helperText={errors.email?.message}
                  error={Boolean(errors.email)}
                  placeholder={translate("enter_email")}
                />
              )}
            />

            <Controller
              name="customerGroup"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate("customer_group")}
                  helperText={errors.customerGroup?.message}
                  error={Boolean(errors.customerGroup)}
                  placeholder={translate("enter_customer_group")}
                />
              )}
            />
          </FormLayout>
        </Box>

        <Box mb={5}>
          <FormLayout cardHeading={translate("additional_information")}>
            <GSDateInput
              id="dateOfBirth"
              label={translate("date_of_birth")}
              // register={register}
              error={errors.dateOfBirth?.message}
            />

            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  label={translate("marital_status")}
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                  placeholder={translate("select_marital_status")}
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
                  label={translate("nationality")}
                  helperText={errors.nationality?.message}
                  error={Boolean(errors.nationality)}
                  placeholder={translate("enter_nationality")}
                />
              )}
            />

            <Controller
              name="facebook"
              control={control}
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  label={translate("facebook")}
                  helperText={errors.facebook?.message}
                  error={Boolean(errors.facebook)}
                  placeholder={translate("enter_facebook")}
                />
              )}
            />

            {/* Other form fields */}
          </FormLayout>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
            {translate("cancel")}
          </CustomButton>
          <CustomButton variant="contained" type="submit">
            {translate("save")}
          </CustomButton>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerForm;
