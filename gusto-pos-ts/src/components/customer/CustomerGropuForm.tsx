"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalization } from "@/context/LocalizationProvider";
import * as z from "zod";

import { Box } from "@mui/material";
import CustomButton from "@/components/widgets/buttons/GSCustomButton";
import GSCard from "@/components/widgets/cards/GSCard";
import TextInput from "@/components/widgets/inputs/GSTextInput";

interface FormData {
  customerGroupName: string;
}
const generateZodSchema = () => {
  return z.object({
    customerGroupName: z.string().min(1, "Customer group name is required"),
  });
};

const CustomerGroupForm = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customerGroupName: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GSCard heading="Customer Group">
        <Box sx={{ padding: 3 }}>
          <Controller
            control={control}
            name="customerGroupName"
            render={({ field }) => (
              <TextInput
                {...field}
                label={translate("customer_group_name")}
                helperText={errors.customerGroupName?.message}
                error={Boolean(errors.customerGroupName)}
                placeholder={translate("enter_customer_group_name")}
                width="350px"
              />
            )}
          />
        </Box>
      </GSCard>
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

export default CustomerGroupForm;
