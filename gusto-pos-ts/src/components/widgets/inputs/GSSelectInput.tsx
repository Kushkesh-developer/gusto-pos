import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
  Box,
} from "@mui/material";

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectInputProps = {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
} & Omit<SelectProps, "value" | "onChange">;

function SelectInput({
  options,
  label,
  placeholder,
  helperText,
  error,
  ...rest
}: SelectInputProps) {
  return (
    <Box
      sx={{
        flex: 0.5,
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {label && <InputLabel sx={{ color: "black" }}>{label}</InputLabel>}
      <Select
        displayEmpty
        sx={{
          height: "49px",
          fontWeight: "normal",
          borderRadius: "0.375rem",
          backgroundColor: "transparent",
          fontSize: "14px",
          "& .MuiInputLabel-root": {
            fontSize: "14px",
          },
        }}
        inputProps={{ "aria-label": placeholder || "Select" }}
        renderValue={(selected) =>
          selected ? (
            (selected as string)
          ) : (
            <p style={{ color: "#A7A7A7" }}>{placeholder}</p>
          )
        }
        error={error}
        {...rest}
      >
        <MenuItem value="">
          <span>{placeholder || "None"}</span>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </Box>
  );
}

export default SelectInput;
