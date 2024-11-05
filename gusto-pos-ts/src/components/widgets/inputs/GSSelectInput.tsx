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
  value?: string;
  onChange?: (_event: SelectChangeEvent) => void;
  renderValue?: (_value: string) => ReactNode;
};
// & Omit<SelectProps<string>, "value" | "onChange" | "renderValue">;

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
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        // marginRight:"0px",
      }}
    >
      {label && <InputLabel sx={{ color: "text.primary" }}>{label}</InputLabel>}
      <Select
        displayEmpty
        sx={{
          height: height,
          fontWeight: "normal",
          borderRadius: theme.shape.borderRadius + "px",
          backgroundColor: "transparent",
          fontSize: "14px",
          "& .MuiInputLabel-root": {
            fontSize: "14px",
            marginRight: "0px",
          },
          "&  .MuiInputBase-input": {
            padding: "8px 8px",
          },
          ...sx,
        }}
        renderValue={(selected) =>
          selected ? (
            (selected as string)
          ) : (
            <Typography sx={{ fontSize: "14px" }} color="primary">
              {placeholder}
            </Typography>
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
      {helperText && <FormHelperText error={true}>{helperText}</FormHelperText>}
    </Box>
  );
}

export default SelectInput;
