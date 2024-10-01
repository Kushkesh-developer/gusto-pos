"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalization } from "@/context/LocalizationProvider";
import * as z from "zod";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import TextInput from "../widgets/inputs/GSTextInput";
import { Box } from "@mui/material";
import CustomButton from "../widgets/buttons/GSCustomButton";
import { TranslateFn } from "@/types/localization-types";

interface formData {
  company_name: z.string;
  country: z.string;
  taxId: z.string;
  about_us: z.string;
  contact_name: z.string;
  company_email: z.string;
  phone_number: z.string;
  address1: z.string;
  address2: z.string;
}
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    company_name: z.string().min(1, translate("company_name_required")),
    country: z.string().min(1, translate("country_required")),
    taxId: z.string().email(translate("taxID_required")),
    about_us: z.string().min(1, translate("about_us_required")),
    contact_name: z.string().min(1, translate("contact_name_required")),
    company_email: z.string().min(1, translate("company_email_required")),
    phone_number: z.string().min(1, translate("phone_number_required")),
    address1: z.string().min(1, translate("address1_required")),
    address2: z.string().min(1, translate("address2_required")),
  });
};

const BusinessInfo: React.FC = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<formData> = () => {};

  // const [selectedImg, setSelectedImg] = useState<string | undefined>();

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImg(imageUrl);
  //   }
  // };

  // const handleRemoveImage = () => {
  //   setSelectedImg(undefined);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout cardHeading="Business informations">
        <Controller
          control={control}
          name="company_name"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("company_name")}
              helperText={errors.company_name?.message}
              error={Boolean(errors.company_name)}
              placeholder="Company name"
            />
          )}
        />
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("country")}
              helperText={errors.country?.message}
              error={Boolean(errors.country)}
              placeholder="Country"
            />
          )}
        />

        <Controller
          control={control}
          name="taxID"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("taxId")}
              helperText={errors.taxID?.message}
              error={Boolean(errors.taxID)}
              placeholder="Tax Id"
            />
          )}
        />
        <Controller
          name="about_us"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("about_us")}
              helperText={errors.about_us?.message}
              error={Boolean(errors.about_us)}
              placeholder="About Us"
            />
          )}
        />

        {/* <Box width="100%">
          {" "}
          <GSImageUpload
            name="productImage"
            onClick={handleRemoveImage}
            errors={errors}
            touched={touched}
            category={false}
            selectedImg={selectedImg}
            onChange={handleImageUpload} // Pass the onChange event handler
          />
        </Box> */}
      </FormLayout>

      <FormLayout cardHeading="Contact Details">
        <Controller
          control={control}
          name="contact_name"
          render={({ field }) => (
            <TextInput
              {...field}
              label="Contact Name"
              helperText={errors.contact_name?.message}
              error={Boolean(errors.contact_name)}
              placeholder="Enter Contact Name"
            />
          )}
        />
        <Controller
          control={control}
          name="company_email"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("company_email")}
              helperText={errors.company_email?.message}
              error={Boolean(errors.company_email)}
              placeholder="Company Email"
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
              placeholder="Phone Number"
            />
          )}
        />
        <Controller
          control={control}
          name="address1"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("address1")}
              helperText={errors.address1?.message}
              error={Boolean(errors.address1)}
              placeholder="Address"
            />
          )}
        />
        <Controller
          control={control}
          name="address2"
          render={({ field }) => (
            <TextInput
              {...field}
              label={translate("address2")}
              helperText={errors.address2?.message}
              error={Boolean(errors.address2)}
              placeholder="Address"
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

export default BusinessInfo;
