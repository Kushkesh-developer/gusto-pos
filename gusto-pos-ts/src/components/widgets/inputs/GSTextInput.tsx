import React, { forwardRef, useState, ChangeEvent } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputLabel, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UseFormRegister } from 'react-hook-form';

type MuiTextFieldProps = {
  isPassword?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  id: string;
  label: string;
  defaultValue?: string | number;
  value?: string | number;
  variant?: 'standard' | 'outlined' | 'filled';
  height?: string;
  register: UseFormRegister<any>;
  error?: boolean;
  helperText?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<TextFieldProps, 'variant' | 'onChange' | 'value' | 'multiline' | 'rows'>;

const TextInput = forwardRef<HTMLInputElement, MuiTextFieldProps>(
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
      height,
      register,
      id,
      label,
      error,helperText,
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
          flex: 0.5,
          minWidth: 200,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <InputLabel htmlFor={id} sx={{ color: 'black' }}>
          {label}
        </InputLabel>
        <TextField
          {...register(id)} // Connect the input to react-hook-form
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
          type={isPassword && !showPassword ? 'password' : 'text'}
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
            style: {
              fontSize: '14px',
              height,
              fontWeight: 'normal',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              ...rest.InputProps?.style, // Preserve existing style
            },
          }}
        />
       
      </Box>
    );
  }
);

export default TextInput;
