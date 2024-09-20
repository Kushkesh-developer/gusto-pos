"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box } from "@mui/material";
import TextInput from "../widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";

interface FormData {
  namePerson: string;
  name: string;
  phoneNumber: string;
  email: string;
  office_telephone: string;
  fax: string;
  postal_code: string;
  address: string;
  // ... other fields
  namePerson: string;
  name: string;
  phoneNumber: string;
  email: string;
  office_telephone: string;
  fax: string;
  postal_code: string;
  address: string;
  // ... other fields
}

// Zod schema generation function with localized error messages
const generateZodSchema = (translate: _any) => {
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
  } = useForm<FormData>({
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
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
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
                  placeholder="Enter Company Name"
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
                  placeholder="Enter Company Person Name"
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
                  placeholder="Enter Phone Number"
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
                  placeholder="Enter Office Telephone"
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
            <Controller
              control={control}
              name="fax"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("fax")}
                  helperText={errors.fax?.message}
                  error={Boolean(errors.fax)}
                  placeholder="Enter Fax"
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
                  placeholder="Enter Postal Code"
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
  return (
    <Box
      sx={{
        maxWidth: "1140px",
      }}
    >
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
                  placeholder="Enter Company Name"
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
                  placeholder="Enter Company Person Name"
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
                  placeholder="Enter Phone Number"
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
                  placeholder="Enter Office Telephone"
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
            <Controller
              control={control}
              name="fax"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("fax")}
                  helperText={errors.fax?.message}
                  error={Boolean(errors.fax)}
                  placeholder="Enter Fax"
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
                  placeholder="Enter Postal Code"
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
