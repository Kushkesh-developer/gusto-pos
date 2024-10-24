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
import { useLocalization } from "@/context/LocalizationProvider";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Define the schema for validation using zod

const signupSchema = zod.object({
  username: zod.string({
    required_error: "Username is required",
  }),
  email: zod
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string with valid email format",
    })
    .email(),
  password: zod.string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: zod.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"], // Specifies where to attach the error
});

// Example usage
const formData = {
  username: "exampleUser",
  email: "user@example.com",
  password: "password123",
  confirmPassword: "password1234", // This will trigger the error
};

const result = signupSchema.safeParse(formData);

if (!result.success) {
     // eslint-disable-next-line no-console
  console.log(result.error.format()); // Outputs validation errors
}





const Signup = () => {
  const { translate } = useLocalization();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true); // For toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(true); // For confirm password visibility

  // Initialize react-hook-form with zodResolver for validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    Cookie.set("loggedIn", "true");
    Cookie.set("email", data.email);
    Cookie.set("password", data.password);
    router.push("/dashboard");
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
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={translate("user_name")}
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message as string}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={translate("email")}
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={translate("password")}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={translate("confirm_new_password")}
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              SIGN UP
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

export default Signup;
