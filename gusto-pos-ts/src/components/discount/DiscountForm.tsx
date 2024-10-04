"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import DateInput from "../widgets/inputs/GSDateInput";
import TextInput from "../widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
import RadioWithTextInput from "../widgets/inputs/GSRadioWithTextInput";
import DaySelector from "../widgets/inputs/GSDaySelector";
import { timeSlots } from "@/mock/discount";
import SelectInput from "../widgets/inputs/GSSelectInput";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TranslateFn } from "@/types/localization-types";
import CustomStack from "../widgets/inputs/GSCustomstack";


const radioOptions = [
  { value: "percentage", label: "Percentage off" },
  { value: "flatAmount", label: "Flat Amount Off" },
];
interface FormData {
  DiscountName: string; // Required
  DiscountCode?: string; // Optional
  ValidFromDate: Dayjs; // Changed to Dayjs for consistency
  ValidToDate: Dayjs; // Changed to Dayjs for consistency
  ApplyDiscount: {
    type: 'percentage' | 'flatAmount'| ""; // Explicit types for clarity
    value: string;
  };
  selectedDays: { value: string }[]; // Required array of selected days
  ValidFromTime: string; // Required
  ValidToTime: string; // Required
  outlets: {
    outlet1: boolean; // Explicit outlet name
    outlet2: boolean; // Explicit outlet name
    // Add more outlets here if needed
  };
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    DiscountName: z.string().min(1, translate("discount_name_required")),
    DiscountCode: z.string().optional(),
    ValidFromDate: z.date().max(new Date(), translate("valid_from_date")),
    ValidToDate: z.date().max(new Date(), translate("valid_to_date")),
    ApplyDiscount: z.object({
      type: z.string().min(1, translate("discount_type_required")),
      value: z.string().min(1, translate("discount_value_required")),
    }),
    selectedDays: z
      .array(z.object({ value: z.string() }))
      .min(1, translate("day_required")),
    ValidFromTime: z.string().min(1, translate("valid_from_time_required")),
    ValidToTime: z.string().min(1, translate("valid_to_time_required")),
    outlets: z.record(z.boolean()),
  });
};

const DiscountForm = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      DiscountName: "",
      ValidFromDate: dayjs(),
      ValidToDate: dayjs(),
      ApplyDiscount: { type: "", value: "" },
      selectedDays: [],
      ValidFromTime: "",
      ValidToTime: "",
      outlets: {
        outlet1: false,
        outlet2: false,
      },
    },
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    // Handle form submission, including the outlets data
  };
  return (
    <Box sx={{ maxWidth: "1140px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={5}>
          <FormLayout cardHeading={translate("discount_form")}>
            <Controller
              name="DiscountName"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("discount_name")}
                  error={Boolean(errors.DiscountName)}
                  helperText={errors.DiscountName?.message}
                />
              )}
            />
            <Controller
              name="DiscountCode"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("discount_code")}
                  error={Boolean(errors.DiscountCode)}
                  helperText={errors.DiscountCode?.message}
                />
              )}
            />
            <CustomStack withoutGrid>
             <Controller
              name="ApplyDiscount"
               control={control}
               render={({ field }) => (
                <RadioWithTextInput
                  title="Add Total Discount"
                  radioOptions={radioOptions}
                  placeholder="Enter discount..."
                  radioValue={field.value.type}
                  inputValue={field.value.value}
                  onRadioChange={(type) => field.onChange({ ...field.value, type })}
                  onInputChange={(value) => field.onChange({ ...field.value, value })}
                  error={Boolean(errors.ApplyDiscount)}
                  helperText={errors.ApplyDiscount?.message}
                />
              )}
            />

            <Controller
              name="selectedDays"
              control={control}
              render={({ field }) => (
                <DaySelector
                  selectedDays={field.value.map((dayObj) => dayObj.value)}
                  onChange={(day) => {
                    const index = field.value.findIndex((d) => d.value === day);
                    if (index >= 0)
                      field.onChange(
                        field.value.filter((d) => d.value !== day)
                      );
                    else field.onChange([...field.value, { value: day }]);
                  }}
                />
              )}
            />
          </CustomStack>
            <Controller
              name="ValidFromDate"
              control={control}
              render={({ field }) => (
                <DateInput
                 id="valid_from_date"
                  {...field}
                  label={translate("valid_from_date")}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                
                />
              )}
            />
            <Controller
              name="ValidToDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  id="valid_to_date"
                  {...field}
                  label={translate("valid_to_date")}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                 
                />
              )}
            />
            <Controller
              name="ValidFromTime"
              control={control}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  label={translate("valid_from_time")}
                  options={timeSlots}
                  placeholder={translate("valid_from_time_optional")} // Updated placeholder
              
                />
              )}
            />
            <Controller
              name="ValidToTime"
              control={control}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  label={translate("valid_to_time")}
                  options={timeSlots}
                  placeholder={translate("valid_to_time_optional")} // Updated placeholder
            
                />
              )}
            />
          </FormLayout>
        </Box>
        <Box mb={5}>
          <FormLayout cardHeading={translate("Apply to these Outlets")}>
            <Controller
              name="outlets.outlet1"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Outlet "
                  />
                </FormGroup>
              )}
            />
            <Controller
              name="outlets.outlet2"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Outlet 2"
                  />
                </FormGroup>
              )}
            />
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

export default DiscountForm;