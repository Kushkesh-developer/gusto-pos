"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, Button } from "@mui/material";

import SelectInput from "../widgets/inputs/GSSelectInput";
import TextInput from "../widgets/inputs/GSTextInput";
import DateInput from "../widgets/inputs/GSDateInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
interface FormData {
  name: string;
}
// Zod schema generation function with localized error messages
const generateZodSchema = (translate: any) => {
  return z.object({
    name: z.string().min(1, translate("customer_group_name_required")),
  });
};

const AddCustomerGroup = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
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
          <FormLayout cardHeading={translate("customer_group")}>
            <React.Fragment>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("customer_group_name")}
                    helperText={errors.name?.message}
                    error={Boolean(errors.name)}
                    placeholder="Enter Customer Group Name"
                  />
                )}
              />
            </React.Fragment>
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

export default AddCustomerGroup;
