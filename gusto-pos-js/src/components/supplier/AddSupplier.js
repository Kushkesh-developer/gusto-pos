"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box } from "@mui/material";
import TextInput from "../widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";

// Zod schema generation function with localized error messages
const generateZodSchema = (translate) => {
  return z.object({
    namePerson: z.string().min(1, translate("company_person_name_required")),
    name: z.string().min(1, translate("company_name_required")),
    phoneNumber: z.string().min(1, translate("phone_number_required")),
    email: z.string().email(translate("invalid_email")),
    office_telephone: z.string().min(1, translate("office_telephone_required")),
    fax: z.string().min(1, translate("fax_required")),
    address: z.string().min(1, translate("address_required")),
    postal_code: z.string().min(1, translate("postal_code_required")),
  });
};

const AddSupplier = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      namePerson: "",
      name: "",
      phoneNumber: "",
      email: "",
      office_telephone: "",
      postal_code: "",
      address: "",
    },
  });

  const onSubmit = () => {};

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate("supplier_details")}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("company_name")}
                  helperText={errors.name?.message}
                  error={Boolean(errors.name)}
                  placeholder={translate("enter_company_name")} // Updated placeholder
                />
              )}
            />

            <Controller
              control={control}
              name="namePerson"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("company_person_name")}
                  helperText={errors.namePerson?.message}
                  error={Boolean(errors.namePerson)}
                  placeholder={translate("Enter Name")} // Updated placeholder
                />
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("phone_number")}
                  helperText={errors.phoneNumber?.message}
                  error={Boolean(errors.phoneNumber)}
                  placeholder={translate("Enter Phone Number")} // Updated placeholder// Updated placeholder
                />
              )}
            />

            <Controller
              control={control}
              name="office_telephone"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("office_telephone")}
                  helperText={errors.office_telephone?.message}
                  error={Boolean(errors.office_telephone)}
                  placeholder={translate("Enter Office Telephone")} // Updated placeholder
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
                  placeholder={translate("Enter Email")} // Updated placeholder
                />
              )}
            />

            <Controller
              control={control}
              name="fax"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("fax")}
                  helperText={errors.fax?.message}
                  error={Boolean(errors.fax)}
                  placeholder={translate("Enter Fax")} // Updated placeholder
                />
              )}
            />

            <Controller
              control={control}
              name="postal_code"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("postal_code")}
                  helperText={errors.postal_code?.message}
                  error={Boolean(errors.postal_code)}
                  placeholder={translate("Enter Postal Code")} //
                />
              )}
            />
          </FormLayout>
        </Box>
        <Box mb={5}>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
              {translate("cancel")}
            </CustomButton>

            <CustomButton variant="contained" type="submit">
              {translate("save")}
            </CustomButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddSupplier;
