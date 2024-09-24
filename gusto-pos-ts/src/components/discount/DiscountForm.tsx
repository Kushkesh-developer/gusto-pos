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

interface FormData {
  DiscountName: string;
  DiscountCode?: string;
  ValidFromDate: Date | Dayjs;
  ValidToDate: Date | Dayjs;
  ApplyDiscount: { type: string; value: string };
  selectedDays: { value: string }[];
  ValidFromTime: string;
  ValidToTime: string;
  outlets: { [key: string]: boolean };
}

const generateZodSchema = (translate: any) => {
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted with data:", data);
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
            <Controller
              name="ApplyDiscount"
              withoutGrid
              control={control}
              render={({ field }) => (
                <RadioWithTextInput
                  radioValue={field.value.type}
                  inputValue={field.value.value}
                  onRadioChange={(type) =>
                    field.onChange({ ...field.value, type })
                  }
                  onInputChange={(value) =>
                    field.onChange({ ...field.value, value })
                  }
                  error={Boolean(errors.ApplyDiscount)}
                  helperText={errors.ApplyDiscount?.message}
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
                    label="Outlet 1"
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