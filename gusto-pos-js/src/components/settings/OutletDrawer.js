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















const generateZodSchema = (translate) => {
  return z.object({
    printername: z.string().min(1, translate("printer_name_is_required")),
    printerIPaddress: z.string().min(1, translate("Ip_address_is_required")),
    printerModel: z.string().min(1, translate("printer_model_is_required")),
    printerType: z.string().min(1, translate("printer_type_is_required")),
    receiptQuantity: z.
    string().
    min(1, translate("receipt_quantity_is_required")),
    printReceiptandBills: z.record(z.boolean()),
    printorders: z.record(z.boolean())
  });
};

export default function printerDrawer(props) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      printerName: "",
      printerIPaddress: "",
      printerModel: "",
      printerType: "",
      receiptQuantity: "",
      printReceiptandBills: false,
      printorders: false
    }
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
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: "50%", p: 2 }
      }}>

      <Typography variant="h6">{translate("add_new_outlet")} </Typography>
      <Box mb={5}>
        <FormLayout cardHeading={translate("outlet_details")}>
          <Controller
            control={control}
            name="printerName"
            render={({ field }) =>
            <TextInput
              {...field}
              label={translate("printer_name")}
              helperText={errors.printerName?.message}
              error={Boolean(errors.printerName)}
              placeholder={translate("printer_name")} />

            } />

          <Controller
            control={control}
            name="printerIPaddress"
            render={({ field }) =>
            <TextInput
              {...field}
              label={translate("printer_ip_address")}
              helperText={errors.printerIPaddress?.message}
              error={Boolean(errors.printerIPaddress)}
              placeholder={translate("printer_ip_address")} />

            } />

          <Controller
            control={control}
            name="printerModel"
            render={({ field }) =>
            <TextInput
              {...field}
              label={translate("printer_model")}
              helperText={errors.printerModel?.message}
              error={Boolean(errors.printerModel)}
              placeholder={translate("printer_model")} />

            } />

          <Controller
            control={control}
            name="printerType"
            render={({ field }) =>
            <TextInput
              {...field}
              label={translate("printer_type")}
              helperText={errors.printerType?.message}
              error={Boolean(errors.printerType)}
              placeholder={translate("printer_type")} />

            } />

          <Controller
            control={control}
            name="receiptQuantity"
            render={({ field }) =>
            <TextInput
              {...field}
              label={translate("receipt_code")}
              helperText={errors.receiptQuantity?.message}
              error={Boolean(errors.receiptQuantity)}
              placeholder={translate("receipt_code")} />

            } />

        </FormLayout>
      </Box>
      <Box
        sx={{
          display: "flex",
          minWidth: "100%",
          justifyContent: "flex-end",
          mt: 2
        }}>

        <Button
          variant="outlined"
          sx={{ h: 10, w: 10, minWidth: 120 }}
          onClick={props.onClose}>

          {translate("cancel")}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}>

          {translate("save")}
        </Button>
      </Box>
    </Drawer>);

}