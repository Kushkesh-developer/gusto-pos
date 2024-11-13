import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import React from "react";
import FormLayout from "@/components/widgets/forms/GSFormCardLayout";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { z } from "zod";

import { Typography, Button } from "@mui/material";
import SelectInput from "../widgets/inputs/GSSelectInput";

const OutletSelect = [
  { value: "category1", label: "category1" },
  { value: "Category2", label: "Category 2" },
];

const generateZodSchema = (translate) => {
  return z.object({
    terminalId: z.string().min(1, translate("terminal_is_required")),
    terminalName: z.string().min(1, translate("terminal_name_is_required")),
    outlet: z.string().min(1, translate("outlet_is_required")),
  });
};

export default function TerminalDrawer(props) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      terminalId: "",
      terminalName: "",
      outlet: "",
    },
  });

  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: "50%", p: 2 },
      }}
    >
      <Typography variant="h6">{translate("add_new_terminal")} </Typography>
      <Box mb={5}>
        <FormLayout cardHeading={translate("terminal_details")}>
          <Controller
            control={control}
            name="terminalId"
            render={({ field }) => (
              <TextInput
                {...field}
                label={translate("terminal_id")}
                helperText={errors.terminalId?.message}
                error={Boolean(errors.terminalId)}
                placeholder={translate("terminal_id")}
              />
            )}
          />

          <Controller
            control={control}
            name="terminalName"
            render={({ field }) => (
              <TextInput
                {...field}
                label={translate("Terminal Name")}
                helperText={errors.terminalName?.message}
                error={Boolean(errors.terminalName)}
                placeholder={translate("terminal_name")}
              />
            )}
          />

          <Controller
            control={control}
            name="outlet"
            render={({ field }) => (
              <SelectInput
                {...field}
                options={OutletSelect}
                label={translate("outlet")}
                helperText={errors.outlet?.message}
                error={Boolean(errors.outlet)}
                placeholder={translate("outlet")}
              />
            )}
          />
        </FormLayout>
      </Box>
      <Box
        sx={{
          display: "flex",
          minWidth: "100%",
          justifyContent: "flex-end",
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{ h: 10, w: 10, minWidth: 120 }}
          onClick={props.onClose}
        >
          {translate("cancel")}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          {translate("save")}
        </Button>
      </Box>
    </Drawer>
  );
}
