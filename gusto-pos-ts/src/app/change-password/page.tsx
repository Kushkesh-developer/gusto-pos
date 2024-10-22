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
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Define the schema for validation using zod
const changePasswordSchema = z.object({
  oldPassword: z.string({
    required_error: "Old password is required",
  }),
  newPassword: z.string({
    required_error: "New password is required",
  }).min(6, "Password must be at least 6 characters"),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords must match",
  path: ["confirmNewPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

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
     // eslint-disable-next-line no-console
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
      <Card sx={{ minWidth: 500, padding: 3 }} variant="elevation">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
          <IconButton onClick={() => router.push("/login")} sx={{ mb: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={180}
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
                    label="Old Password"
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
                    label="New Password"
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
                    label="Confirm New Password"
                    variant="outlined"
                    type={showConfirmNewPassword ? "text" : "password"}
                    error={!!errors.confirmNewPassword}
                    helperText={errors.confirmNewPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                          edge="end"
                        >
                          {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
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
              CHANGE PASSWORD
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
        © 2024 GustoPOS, Encoresky Technologies Pvt. Ltd. All rights reserved.
      </Typography>
    </Box>
  );
};

export default ChangePassword;
