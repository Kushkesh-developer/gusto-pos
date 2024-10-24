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
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { z as zod } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import { useLocalization } from "@/context/LocalizationProvider";
// interface FieldValues {
//     email: string
//     password: string | number |undefined |null

//   }
// Define the schema for validation using zod
const loginSchema = zod.object({
  email: zod
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string with valid email format",
    })
    .email(),
  password: zod.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be more than 5 characters",
  }),
});
// type FieldValues = zod.infer<typeof loginSchema>;
const Login = () => {
  const router = useRouter();
  const { translate } = useLocalization();
  // Initialize react-hook-form with zodResolver for validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
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
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                  />
                )}
              />
            </Stack>
            <Button>{translate("login")}</Button>
          </CardContent>
          <CardActions sx={{ justifyContent: "center", px: 2, mt: 4 }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              {translate("login")}
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

export default Login;
