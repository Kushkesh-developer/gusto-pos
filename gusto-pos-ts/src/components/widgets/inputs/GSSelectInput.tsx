import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
  Box,
  SxProps,
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
  height?: string;
  sx?: SxProps;
} & Omit<SelectProps, "value" | "onChange">;

function SelectInput({
  options,
  label,
  placeholder,
  helperText,
  error,
  height = "48px",
  sx = {},
  ...rest
}: SelectInputProps) {
  return (
    <Box
      sx={{
       
        // minWidth: "50%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {label && <InputLabel sx={{ color: "text.primary" }}>{label}</InputLabel>}
      <Select
        displayEmpty
        sx={{
          height: height,
          fontWeight: "normal",
          borderRadius: "0.375rem",
          backgroundColor: "transparent",
          fontSize: "14px",
          "& .MuiInputLabel-root": {
            fontSize: "14px",
          },
          ...sx,
        }}
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
        {/* <MenuItem value="">
          <span>{placeholder || "None"}</span>
        </MenuItem> */}
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Box>
  );
}

export default SelectInput;
