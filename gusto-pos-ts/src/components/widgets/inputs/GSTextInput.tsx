import React, { forwardRef, useState, ChangeEvent } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputLabel, Box, IconButton, InputAdornment, Theme } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SxProps } from '@mui/system';

type MuiTextFieldProps = {
  isPassword?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  label?: string;
  defaultValue?: string | number;
  value?: string | number;
  variant?: 'standard' | 'outlined' | 'filled';
  height?: string;
  width?: string;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
  onChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
  requiredMark?: boolean; // New prop to display a star for required fields
} & Omit<TextFieldProps, 'variant' | 'onChange' | 'value' | 'multiline' | 'rows'>;

const GSTextInput = forwardRef<HTMLInputElement, MuiTextFieldProps>(
  (
    {
      className,
      placeholder,
      endAdornment,
      startAdornment,
      isPassword,
      multiline,
      variant = 'outlined',
      onChange,
      rows,
      defaultValue,
      value,
      height = '44px', // Default height set to 44px
      label,
      error,
      helperText,
      width,
      sx = {},
      requiredMark,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          ...sx,
        }}
      >
        {label && (
          <InputLabel sx={{ color: 'text.primary' }}>
            {label}
            {requiredMark && <span style={{ marginLeft: '4px' }}>*</span>}
          </InputLabel>
        )}

        <TextField
          {...rest}
          inputRef={ref}
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
          type={isPassword && !showPassword ? 'password' : 'text'}
          sx={{
            ...sx,
            '& .MuiInputBase-root': {
              fontSize: '14px',
              height,
              width,
              fontWeight: 'normal',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
            },
            '& .MuiInputBase-input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 0',
              caretColor: 'inherit',
              transition: 'background-color 5000s ease-in-out 0s',
            },
          }}
          InputProps={{
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
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
          }}
        />
      </Box>
    );
  },
);

export default GSTextInput;
