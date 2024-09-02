import React from "react";
import { TextField, InputLabel, Box, Typography } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  register,
  error,
}) => {
  return (
    <Box
      sx={{
        flex: "0.5",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <InputLabel htmlFor={id} sx={{ color: "black" }}>
        {label}
      </InputLabel>
      <TextField
        id={id}
        type={type}
        fullWidth
        {...register(id)}
        error={!!error}
        sx={{ width: "100%" }}
        inputProps={{
          style: {
            padding: "10.5px 16px",
          },
        }}
      />
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default TextInput;
