import React, { ReactNode } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  SxProps,
  SelectChangeEvent,
  Typography,
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
  width?: string;
  sx?: SxProps;
  value?: string;
  placeholderColor?: string;
  onChange?: (_event: SelectChangeEvent) => void;
  renderValue?: (_value: string) => ReactNode;
 variant?: "default" | "theme";
};

function SelectInput({
  options,
  label,
  placeholder,
  helperText,
  error,
  height = "44px",
  width = "100%",
  placeholderColor,
 variant = "default",
  sx = {},
  ...rest
}: SelectInputProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        marginRight: "16px",
      }}
    >
      {label && <InputLabel sx={{ color: "text.primary" }}>{label}</InputLabel>}
      <Select
        displayEmpty
        sx={{
          height: height,
          fontWeight: "normal",
          borderRadius: "0.375rem",
          width:variant === "theme" && placeholderColor === "primary" ? "190px" : width,
          backgroundColor: "transparent",
          fontSize: "14px",
          border:variant === "theme" ? "1px solid" : "none",
          borderColor:variant === "theme" && placeholderColor ? "primary.main" : "none",
          "& .MuiInputLabel-root": {
            fontSize: "14px",
            marginRight: "0px",
          },
          "& .MuiInputBase-input": {
            padding: "8px 8px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor:variant === "theme" && placeholderColor ? "primary.main" : "none",
          },
          ...sx,
        }}
        renderValue={(selected) =>
          selected ? (
            selected as string
          ) : (
            <Typography
              sx={{ fontSize: "14px" }}
              color={
               variant === "theme" && placeholderColor
                  ? placeholderColor
                  : "text.secondary"
              }
            >
              {placeholder}
            </Typography>
          )
        }
        error={error}
        {...rest}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Box>
  );
}

export default SelectInput;
  