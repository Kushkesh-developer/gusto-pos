import React from "react";
import { Select, MenuItem, InputLabel, Box, Typography } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface SelectInputProps {
  id: string;
  label: string;
  options: string[];
  register: UseFormRegister<any>;
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  options,
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
      <Select
        id={id}
        fullWidth
        {...register(id)}
        error={!!error}
        sx={{
          padding: "5.4px 10px",
          "& .MuiSelect-select": {
            padding: "5.5px 10px",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SelectInput;
