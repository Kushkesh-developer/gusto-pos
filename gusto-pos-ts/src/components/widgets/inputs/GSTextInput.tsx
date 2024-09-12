import React, { forwardRef, useState, ChangeEvent } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { InputLabel, Box, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type MuiTextFieldProps<T> = {
  isPassword?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  label: string;
  defaultValue?: string | number;
  value?: string | number;
  variant?: "standard" | "outlined" | "filled";
  height?: string;
  width?: string;
  error?: boolean;
  helperText?: string;
  flexValue?: number; // New prop for flex value
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  TextFieldProps,
  "variant" | "onChange" | "value" | "multiline" | "rows"
>;

const TextInput = forwardRef<HTMLInputElement, MuiTextFieldProps<any>>(
  (
    {
      className,
      placeholder,
      endAdornment,
      startAdornment,
      isPassword,
      multiline,
      variant = "outlined",
      onChange,
      rows,
      defaultValue,
      value,
      height,
      label,
      error,
      helperText,
      width,
      flexValue = 0.5, // Default flex value
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Box
        sx={{
          flex: flexValue, // Use the flexValue prop
          minWidth: 200,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <InputLabel sx={{ color: "text.primary" }}>{label}</InputLabel>

        <TextField
          {...rest}
          inputRef={ref} // Forward the ref to the TextField component
          rows={rows}
          onChange={onChange}
          variant={variant}
          defaultValue={defaultValue}
          value={value}
          multiline={multiline || false}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          className={className}
          type={isPassword && !showPassword ? "password" : "text"}
          slotProps={{
            input: {
              startAdornment: startAdornment && (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {isPassword && (
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  )}
                  {endAdornment}
                </InputAdornment>
              ),
              style: {
                fontSize: "14px",
                height,
                width,
                fontWeight: "normal",
                borderRadius: "0.375rem",
                backgroundColor: "transparent",
              },
            },
          }}
        />
      </Box>
    );
  }
);

export default TextInput;
