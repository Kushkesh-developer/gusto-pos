import {
  Box,
  InputLabel,
  SxProps,
  TextField,
  TextFieldProps,
  InputAdornment,
} from "@mui/material";
import React, { ChangeEvent } from "react";

type MuiNumberInputProps = {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string | number;
  value?: string | number;
  variant?: "standard" | "outlined" | "filled";
  height?: string;
  width?: string;
  error?: boolean;
  helperText?: string;
  sx?: SxProps;
  containerSx?: SxProps;
  onChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  TextFieldProps,
  "variant" | "onChange" | "value" | "multiline" | "rows"
>;

function GSNumberInput(props: MuiNumberInputProps) {
  const {
    sx = {},
    containerSx = {},
    label,
    startAdornment,
    endAdornment,
    ...rest
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        ...containerSx,
      }}
    >
      {label && <InputLabel sx={{ color: "text.primary" }}>{label}</InputLabel>}
      <TextField
        {...rest}
        id="outlined-number"
        type="number"
        placeholder={props.placeholder}
        sx={{
          ...sx,
          "& .MuiInputBase-root": {
            height: "44px", // Sets the height of the root element
          },
        }}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
          style: {
            fontSize: "14px",
            fontWeight: "normal",
            borderRadius: "0.375rem",
            backgroundColor: "transparent",
          },
        }}
      />
    </Box>
  );
}

export default GSNumberInput;
