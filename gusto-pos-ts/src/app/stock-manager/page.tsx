"use client";
import { useState } from "react";
import StockHeader from "@/components/stock-manager/StockHeader";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Divider,
  Paper,
  Stack,
  ToggleButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Flip from "@mui/icons-material/Flip";
import Search from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";
import TextInput from "@/components/widgets/inputs/GSTextInput";
import ProductCard from "@/components/stock-manager/ProductCard";
import Grid from "@mui/material/Grid2";
import { TranslateFn } from "@/types/localization-types";

interface FormData {
  user: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    user: z.string().min(1, translate("gender_required")),
  });
};

const userList = [
  {
    label: "Test User",
    value: "user1",
  },
  {
    label: "Test user 2",
    value: "user2",
  },
];

interface CardButtonData {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
}

const CardButton = (props: CardButtonData) => {
  return (
    <Card sx={{ minWidth: 75 }} onClick={() => props.onClick()}>
      <Button>{props.icon}</Button>
      <Typography>{props.title}</Typography>
    </Card>
  );
};

export default function StockManager() {
  const [showQR, setShowQR] = useState(false);
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Box sx={{ flex: "1 1 auto" }}>
      <StockHeader />
      <Stack gap={2} sx={{ p: 2 }} direction="row">
        <Box flex={1}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper sx={{ p: 2 }}>
              <Stack gap={2}>
                <Stack direction="row" gap={2} display="flex">
                  <Box flex={1}>
                    <Controller
                      name="user"
                      control={control}
                      render={({ field }) => (
                        <SelectInput
                          {...field}
                          options={userList}
                          placeholder={translate("select_user")}
                          helperText={errors.user?.message}
                          error={Boolean(errors.user)}
                        />
                      )}
                    />
                  </Box>
                  <ToggleButton
                    value="centered"
                    sx={{ height: 44, width: 44 }}
                    aria-label="left aligned"
                  >
                    <Add />
                  </ToggleButton>
                </Stack>
                <Stack direction="row" gap={2} display="flex">
                  {showQR ? (
                    <GSSearchField
                      placeHolder={translate("search")}
                      sx={{ height: 44, flex: 1 }}
                      outlined
                    />
                  ) : (
                    <TextInput
                      sx={{
                        flex: 1,
                        "& .MuiInputBase-root": {
                          height: 44,
                        },
                      }}
                      placeholder={translate("enter_barcode")}
                    />
                  )}
                  <ToggleButton
                    value="centered"
                    sx={{ height: 44, width: 44 }}
                    onToggle={() => {
                      setShowQR(!showQR);
                    }}
                  >
                    {showQR ? <Flip /> : <Search />}
                  </ToggleButton>
                </Stack>
              </Stack>
            </Paper>
            <Paper sx={{ mt: 2, p: 2 }}>
              <Stack direction="row" spacing={2} sx={{ overflow: "hidden" }}>
                <Controller
                  name="user"
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      options={userList}
                      placeholder={translate("select_user")}
                      helperText={errors.user?.message}
                      error={Boolean(errors.user)}
                    />
                  )}
                />
                <Controller
                  name="user"
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      options={userList}
                      placeholder={translate("select_user")}
                      helperText={errors.user?.message}
                      error={Boolean(errors.user)}
                    />
                  )}
                />
                <Controller
                  name="user"
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      options={userList}
                      placeholder={translate("select_user")}
                      helperText={errors.user?.message}
                      error={Boolean(errors.user)}
                    />
                  )}
                />
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2} alignItems={"center"}>
                <Stack
                  direction="row"
                  sx={{
                    flex: 1,
                    backgroundColor: theme.palette.grey[200],
                    px: 3,
                    py: 1,
                  }}
                  justifyContent="space-between"
                >
                  <Typography variant="h6">
                    {translate("grand_total")}:
                  </Typography>
                  <Typography variant="h6">L£1400</Typography>
                </Stack>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  {translate("tax")}: L£0.00
                </Typography>
                <Button variant="contained">{translate("pay_now")}</Button>
                <Button variant="outlined">{translate("reset")}</Button>
              </Stack>
            </Paper>
          </form>
        </Box>
        <Box flex={1.2}>
          <Stack direction="row" gap={2}>
            <CardButton icon={<Add />} title="All" onClick={() => {}} />
            <CardButton icon={<Add />} title="Test" onClick={() => {}} />
          </Stack>
          <Grid container spacing={2} mt={2}>
            <Grid size={3}>
              <ProductCard
                title="Test"
                tests="Test 11"
                price="L£1400"
                image="/images/product.jpg"
                onClick={() => {}}
              />
            </Grid>
          </Grid>
          <Box
            flex={1}
            sx={{
              height: "100%",
              mt: 0,
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          ></Box>
        </Box>
      </Stack>
    </Box>
  );
}
