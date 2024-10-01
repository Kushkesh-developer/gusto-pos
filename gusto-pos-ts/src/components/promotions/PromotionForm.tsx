"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box } from "@mui/material";
import TextInput from "../widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import RadioWithTextInput from "../widgets/inputs/GSRadioWithTextInput";
import { TranslateFn } from "@/types/localization-types";
import dayjs, { Dayjs } from "dayjs";
import { timeSlots } from "@/mock/discount";
import DateInput from "../widgets/inputs/GSDateInput"
import SelectInput from "../widgets/inputs/GSSelectInput";
import DaySelector from "../widgets/inputs/GSDaySelector";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomButton from "../widgets/buttons/GSCustomButton";
const radioOptions = [
  { value: "categories", label: "Categories" },
  { value: "products", label: "Products" },
];
const radioOptions1 = [
  { value: "percentage", label: "Percentage off" },
  { value: "flatAmount", label: "Flat Amount Off" },
];

interface FormData {
  PromotionName: string;
  Minimum_Quantity_Required: number;
  PromotionalItem: {
    type: "categories" | "products";
    value: string;
  };
  ApplyDiscount: {
    type: "percentage" | "flatAmount";
    value: string;
  };
  ValidFromDate: Dayjs; // Changed to Dayjs for consistency
  ValidToDate: Dayjs; // Changed to Dayjs for consistency
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
    PromotionName: z.string().min(1, { message: translate("promotion_name_required") }),
    Minimum_Quantity_Required: z.number().min(1, { message: translate("minimum_quantity_required") }),
    PromotionalItem: z.object({
      type: z.string().min(1, translate("promotional_type_required")),
      value: z.string().min(1, translate("promotional_value_required")),
    }),
    ApplyDiscount: z.object({
      type: z.string().min(1, translate("discount_type_required")),
      value: z.string().min(1, translate("discount_value_required")),
    }),
    selectedDays: z
    .array(z.object({ value: z.string() }))
    .min(1, translate("day_required")),
    outlets: z.record(z.boolean()),
  });
};

const PromotionForm = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      PromotionName: "",
      Minimum_Quantity_Required: 0,
      PromotionalItem: { type: "categories", value: "" }, // Initialized here
      ApplyDiscount: { type: "", value: "" },
      ValidFromDate: dayjs(),
      ValidToDate: dayjs(),
      ValidFromTime: "",
      ValidToTime: "",
      selectedDays: [],
      outlets: {
        outlet1: false,
        outlet2: false,
      },
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ maxWidth: "1140px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate("Promotional_form")}>
            <Controller
              name="PromotionName"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("PromotionName")}
                  error={Boolean(errors.PromotionName)}
                  helperText={errors.PromotionName?.message}
                />
              )}
            />
            <Controller
              name="Minimum_Quantity_Required"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("Minimum_Quantity_Required")}
                  error={Boolean(errors.Minimum_Quantity_Required)}
                  helperText={errors.Minimum_Quantity_Required?.message}
                />
              )}
            />
            <Controller
              name="PromotionalItem" 
                  control={control}
                  render={({ field }) => (
                <RadioWithTextInput
                  title={translate("Promotional Item")}
                  radioOptions={radioOptions}
                  placeholder={translate("Enter Promotion...")}
                  radioValue={field.value.type}
                  inputValue={field.value.value}
                  onRadioChange={(type) => field.onChange({ ...field.value, type })}
                  onInputChange={(value) => field.onChange({ ...field.value, value })}
                  error={Boolean(errors.PromotionalItem)}
                  helperText={errors.PromotionalItem?.message}
                />
              )}
            />
            <Controller
            name="ApplyDiscount"
              control={control}
              render={({ field }) => (
              <RadioWithTextInput
              radioOptions={radioOptions1}
                 title="Add Total Discount"
                placeholder="Enter discount..."
                 radioValue={field.value.type}
                 inputValue={field.value.value} // Fixed this line
                 onRadioChange={(type) => field.onChange({ ...field.value, type })}
               onInputChange={(value) => field.onChange({ ...field.value, value })}
              error={Boolean(errors.ApplyDiscount)}
                helperText={errors.ApplyDiscount?.message}
    />
  )}
/>
          </FormLayout>
        </Box>
        <Box mb={5}>
        <FormLayout cardHeading={translate("Promotional Duration")}>
          
          <Controller
              name="ValidFromDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  {...field}
                  label={translate("valid_from_date")}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  error={Boolean(errors.ValidFromDate)}
                  helperText={errors.ValidFromDate?.message}
                />
              )}
            />
                <Controller
              name="ValidToDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  {...field}
                  label={translate("valid_to_date")}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  error={Boolean(errors.ValidToDate)}
                  helperText={errors.ValidToDate?.message}
                />
              )}
            />
              <Controller
              name="ValidFromTime"
              control={control}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  label={translate("Valid_from_Time")}
                  options={timeSlots}
                  placeholder="Select time"
                  helperText={errors.ValidFromTime?.message}
                  error={Boolean(errors.ValidFromTime)}
                />
              )}
            />
           
               <Controller
              name="ValidToTime"
              control={control}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  label={translate("Valid_to_Time")}
                  options={timeSlots}
                  placeholder="Select time"
                  helperText={errors.ValidToTime?.message}
                  error={Boolean(errors.ValidToTime)}
                />
              )}
            />
               <Controller
              name="selectedDays"
              withoutGrid
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
                  error={Boolean(errors.selectedDays)}
                  helperText={errors.selectedDays?.message}
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

export default PromotionForm;
