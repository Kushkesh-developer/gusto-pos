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
  useTheme,
  alpha,
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
  const theme = useTheme();
  const isThemed = variant === "theme";
console.log(theme ,'theme');

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        marginRight: "0px",
      }}
    >
      {label && <InputLabel sx={{ color: "text.primary" }}>{label}</InputLabel>}
      <Select
        displayEmpty
        sx={{
          height,
          width: isThemed && placeholderColor === "primary" ? "190px" : width,
          borderRadius: "0.375rem",
          backgroundColor: "transparent",
          fontSize: "14px",
          // Apply default border styles if variant is not 'theme'
          // border: "1px", // Default gray border
          borderColor: isThemed
            ? placeholderColor
              ? theme.palette.primary.main
              : theme.palette.grey[600]
            :`${theme.palette.background.default}`, // Default border color
          "& .MuiInputLabel-root": {
            fontSize: "14px",
            marginRight: "0px",
          },
          "& .MuiSvgIcon-root":{
               color:isThemed ?`${theme.palette.primary.main}`:"none"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main, // Hover effect border color
          },
          "& .MuiInputBase-input": {
            padding: "8px 8px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border:`1px solid ${theme.palette.primary.main}`
          },
          // "& .MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":{

          // }
          "& .MuiOutlinedInput-notchedOutline": {
            border:  "1px solid",
            borderColor: isThemed
              ? alpha(theme.palette.primary.main, 0.5)
              : theme.palette.grey[600], // Default border color
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
                isThemed && placeholderColor
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
