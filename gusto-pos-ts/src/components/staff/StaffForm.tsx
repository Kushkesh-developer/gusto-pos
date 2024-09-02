"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalization } from "@/context/LocalizationProvider";
import * as z from "zod";

import FormLayout from "../widgets/forms/GSFormCardLayout";
import SelectInput from "../widgets/inputs/GSSelectInput";
import TextInput from "../widgets/inputs/GSTextInput";
import GSCard from "../widgets/cards/GSCard";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import GSActionButton from "../widgets/buttons/GSActionButton";
import DateInput from "../widgets/inputs/GSDateInput";

const MockStaffFormData = [
  { label: "Bukit Batok", value: "bukitBatok" },
  { label: "Chai Chee", value: "chaiChee" },
];

const generateZodSchema = (translate: any) => {
  return z.object({
    gender: z.string().min(1, "Gender is required"),
    name: z.string().min(1, "Customer Name is required"),
    phone_number: z.string().min(1, "Phone Number is required"),
    email: z.string().email("Invalid email address"),
    date_of_birth: z.date().max(new Date(), translate("date_of_birth_past")),
    marital_status: z.string().min(1, translate("marital_status_required")),
    nationality: z.string().min(1, translate("nationality_required")),
    rate: z.string().min(1, "rate is required"),
    minimum_working_hour: z.string().min(1, "minimum working hour required"),
    sales_commision_percentage: z
      .string()
      .min(1, "sales commision percentage is required"),
    max_sales_discount_percentage: z
      .string()
      .min(1, "max sales percentage is required"),
    facebook: z.string().optional(),
    linkedIn: z.string().optional(),
    twitter: z.string().optional(),
    address: z.string().min(1, translate("address_required")),
  });
};

const StaffForm: React.FC = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      gender: "Male",
      email: "",
      role: "",
      phone_number: "",
      rate: "",
      minimum_working_hour: "",
      sales_commision_percentage: "",
      max_sales_discount_percentage: "",
      date_of_birth: null,
      marital_status: "",
      nationality: "",
      facebook: "",
      linkedIn: "",
      twitter: "",
      address: "",
      // account_holder_name: "",
      // account_number: "",
      // bank_name: "",
      // branch: "",
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout cardHeading="Staff Details">
        <React.Fragment>
          <TextInput
            id="name"
            label={translate("staff_name")}
            register={register}
            error={errors.name?.message}
          />
          <SelectInput
            id="gender"
            label={translate("gender")}
            options={["Male", "Female", "Other"]}
            register={register}
            error={errors.gender?.message}
          />
        </React.Fragment>
        <React.Fragment>
          <TextInput
            id="email"
            label={translate("email")}
            register={register}
            error={errors.email?.message}
          />
          <SelectInput
            id="role"
            label={translate("role")}
            options={["Option1", "Option2", "Option3"]}
            register={register}
            error={errors.role?.message}
          />
        </React.Fragment>
        <React.Fragment>
          <TextInput
            id="phoneNumber"
            label={translate("phone_number")}
            register={register}
            error={errors.phone_number?.message}
          />
        </React.Fragment>
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
          <>
            {[1, 2, 3, 4].map((item) => {
              return (
                <TextField
                  key={item}
                  defaultValue={item}
                  sx={{
                    padding: "0px 16px",
                    ".MuiInputBase-input": {
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#F0F0F0",
                      borderColor: "transparent",
                      color: "black",
                      fontWeight: "700",
                      fontSize: "24px",
                      textAlign: "center",
                    },
                  }}
                />
              );
            })}
          </>
          <GSActionButton
            label="Copy to Clipboard"
            variant="contained"
            onClick={() => {}}
          />
        </Stack>
      </GSCard>
      <FormLayout cardHeading="Salary">
        <React.Fragment>
          <TextInput
            id="rate"
            // label={translate("rate")}
            label="Rate"
            register={register}
            error={errors.rate?.message}
          />
          <TextInput
            id="minimum_working_hour"
            label={translate("minimum_working_hour")}
            register={register}
            error={errors.minimum_working_hour?.message}
          />
        </React.Fragment>
        <React.Fragment>
          <TextInput
            id="sales_commision_percentage"
            label={translate("sales_commision_percentage")}
            register={register}
            error={errors.sales_commision_percentage?.message}
          />
          <TextInput
            id="max_sales_discount_percentage"
            label={translate("max_sales_discount_percentage")}
            register={register}
            error={errors.max_sales_discount_percentage?.message}
          />
        </React.Fragment>
      </FormLayout>
      <FormLayout cardHeading="Additional Information">
        <React.Fragment>
          <DateInput
            id="dateOfBirth"
            label={translate("date_of_birth")}
            register={register}
            error={errors.date_of_birth?.message}
          />
          <SelectInput
            id="marital_status"
            label={translate("marital_status")}
            options={["Single", "Married"]}
            register={register}
            error={errors.marital_status?.message}
          />
        </React.Fragment>
        <React.Fragment>
          <TextInput
            id="nationality"
            label={translate("nationality")}
            register={register}
            error={errors.nationality?.message}
          />
          <TextInput
            id="facebook"
            label={translate("facebook")}
            register={register}
            error={errors.facebook?.message}
          />
        </React.Fragment>
        <React.Fragment>
          <TextInput
            id="linkedIn"
            label={translate("linkedIn")}
            register={register}
            error={errors.linkedIn?.message}
          />
          <TextInput
            id="twitter"
            label={translate("twitter")}
            register={register}
            error={errors.twitter?.message}
          />
        </React.Fragment>
        <React.Fragment>
          <TextInput
            id="address"
            label={translate("address")}
            register={register}
            error={errors.address?.message}
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
    </form>
  );
};

export default StaffForm;
