"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useLocalization } from "@/context/LocalizationProvider";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TranslateFn } from "@/types/localization-types";

// Define the interface for form data
interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Function to generate the Zod schema
const generateZodSchema = (translate: TranslateFn) => {
  return z
    .object({
      oldPassword: z.string().min(1, translate("old_password_is_required")),
      newPassword: z
        .string()
        .min(6, translate("password_must_be_at_least_6_charact"))
        .nonempty(translate("new_password_is_required")),
      confirmNewPassword: z
        .string()
        .nonempty(translate("please_confirm_your_password")),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: translate("new_passwords_must_match"),
      path: ["confirmNewPassword"],
    });
};

const ChangePassword = () => {
  const { translate } = useLocalization();
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

  // Generate the schema using the localization translate function
  const changePasswordSchema = generateZodSchema(translate);

  // Initialize react-hook-form with zodResolver for validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    console.log(data);
    router.push("/dashboard"); // Redirect after successful password change
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{ minWidth: { xs: "80%", sm: 500 }, padding: 3 }}
        variant="elevation"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <IconButton onClick={() => router.push("/login")} sx={{ mb: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image
                src="/est-logo.svg"
                alt="Gusto POS Logo"
                width={100}
                height={100}
                priority
                style={{ marginBottom: 40 }}
              />
            </Box>
            <Stack spacing={2}>
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={translate("old_password")}
                    variant="outlined"
                    type={showOldPassword ? "text" : "password"}
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          edge="end"
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={translate("new_password")}
                    variant="outlined"
                    type={showNewPassword ? "text" : "password"}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="confirmNewPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={translate("confirm_new_password")}
                    variant="outlined"
                    type={showConfirmNewPassword ? "text" : "password"}
                    error={!!errors.confirmNewPassword}
                    helperText={errors.confirmNewPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }
                          edge="end"
                        >
                          {showConfirmNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "center", px: 2, mt: 4 }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              {translate("change_password")}
            </Button>
          </CardActions>
        </form>
      </Card>
      <Typography
        variant="body2"
        maxWidth={400}
        textAlign={"center"}
        mt={2}
        color={"text.secondary"}
      >
        {translate("copyright_text")}
      </Typography>
    </Box>
  );
};

export default ChangePassword;
