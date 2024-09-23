"use client";
import React from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
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

interface FormData {
  DiscountName: string;
  ValidFromDate: Date | Dayjs;
  ValidToDate: Date | Dayjs;
  ApplyDiscount: { type: string; value: string };
  selectedDays: { value: string }[];
}

const generateZodSchema = (translate: any) => {
  return z.object({
    DiscountName: z.string().min(1, translate("discount_name_required")),
    ValidFromDate: z.date().max(new Date(), translate("valid_from_date")),
    ValidToDate: z.date().max(new Date(), translate("valid_to_date")),
    ApplyDiscount: z.object({
      type: z.string().min(1, translate("discount_type_required")),
      value: z.string().min(1, translate("discount_value_required")),
    }),
    selectedDays: z
      .array(z.object({ value: z.string() }))
      .min(1, translate("day_required")),
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
      ValidFromDate: dayjs(), // Initialize with Dayjs instance
      ValidToDate: dayjs(), // Initialize with Dayjs instance
      ApplyDiscount: { type: "", value: "" },
      selectedDays: [],
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
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
              name="selectedDays"
              control={control}
              withoutGrid
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
                  error={errors.ValidFromDate?.message}
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
                  error={errors.ValidToDate?.message}
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
