import React, { forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { InputLabel, Box, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const GSTextInput = forwardRef(
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
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    //  const theme= useTheme()
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          ...sx,
        }}
      >
        {label && <InputLabel sx={{ color: 'text.primary' }}>{label}</InputLabel>}

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
          type={isPassword && !showPassword ? 'password' : 'text'}
          sx={{
            input: {
              '&:-webkit-autofill': null,
            },
          }}
          slotProps={{
            input: {
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
                width,
                fontWeight: 'normal',
                borderRadius: '0.375rem',
                backgroundColor: 'transparent',
              },
            },
          }}
        />
      </Box>
    );
  },
);
GSTextInput.displayName = 'GSTextInput';
export default GSTextInput;
