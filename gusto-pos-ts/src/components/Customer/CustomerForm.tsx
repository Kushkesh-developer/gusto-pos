"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Typography,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";

// Define the Zod schema for validation
const schema = z.object({
  gender: z.string().min(1, "Gender is required"),
  name: z.string().min(1, "Customer Name is required"),
  phoneNumber: z.string().min(1, "Customer Phone Number is required"),
  email: z.string().email("Invalid email address"),
  customerGroup: z.string().min(1, "Customer Group is required"),
});

// Define the TypeScript types based on the Zod schema
type CustomerFormInputs = z.infer<typeof schema>;

const CustomerForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CustomerFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          width: "1135px",
          padding: "2rem",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            //   width: "70%",
            //   padding: "2rem",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              backgroundColor: "#e0e0e0",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            Customer Details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ padding: "30px" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="gender" sx={{ color: "black" }}>
                    Gender
                  </InputLabel>
                  <Select
                    id="gender"
                    fullWidth
                    defaultValue="Male"
                    {...register("gender")}
                    error={!!errors.gender}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography color="error" variant="caption">
                      {errors.gender.message}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="name" sx={{ color: "black" }}>
                    Customer Name
                  </InputLabel>
                  <TextField
                    id="name"
                    type="text"
                    fullWidth
                    {...register("name")}
                    error={!!errors.name}
                  />
                  {errors.name && (
                    <Typography color="error" variant="caption">
                      {errors.name.message}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="phoneNumber" sx={{ color: "black" }}>
                    Phone Number
                  </InputLabel>
                  <TextField
                    id="phoneNumber"
                    type="text"
                    fullWidth
                    {...register("phoneNumber")}
                    error={!!errors.phoneNumber}
                  />
                  {errors.phoneNumber && (
                    <Typography color="error" variant="caption">
                      {errors.phoneNumber.message}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="email" sx={{ color: "black" }}>
                    Email
                  </InputLabel>
                  <TextField
                    id="email"
                    type="email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                  />
                  {errors.email && (
                    <Typography color="error" variant="caption">
                      {errors.email.message}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ width: "50%" }}>
                <InputLabel htmlFor="customerGroup" sx={{ color: "black" }}>
                  Customer Group
                </InputLabel>
                <TextField
                  id="customerGroup"
                  type="text"
                  fullWidth
                  {...register("customerGroup")}
                  error={!!errors.customerGroup}
                />
                {errors.customerGroup && (
                  <Typography color="error" variant="caption">
                    {errors.customerGroup.message}
                  </Typography>
                )}
              </Box>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomerForm;
