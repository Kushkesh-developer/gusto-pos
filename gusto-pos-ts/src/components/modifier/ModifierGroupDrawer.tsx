import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import React from "react";
import FormLayout from "@/components/widgets/forms/GSFormCardLayout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { z } from "zod";
import { TranslateFn } from "@/types/localization-types";
import { Button, Typography } from "@mui/material";

type NewModifierGroupDrawerProps = {
  open: boolean;
  onClose: () => void;
};
interface FormData {
  groupName: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    groupName: z.string().min(1, translate("enter_group_name")),
  });
};

export default function NewModifierGroupDrawer(
  props: NewModifierGroupDrawerProps,
) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      groupName: "",
    },
  });
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
      <Typography variant="h6">{translate("Add New Modifier")}</Typography>
      <Box mb={5}>
        <FormLayout cardHeading={translate("modifier_group")}>
          <Controller
            control={control}
            name="groupName"
            render={({ field }) => (
              <TextInput
                {...field}
                label={translate("groupname")}
                helperText={errors.groupName?.message}
                error={Boolean(errors.groupName)}
                placeholder={translate("enter_group_name")}
              />
            )}
          />
        </FormLayout>
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
      </Box>
    </Drawer>
  );
}
