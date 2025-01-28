import React from 'react';
import { Box, InputLabel, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';

const GSNumberInput = ({
  label,
  startAdornment,
  endAdornment,
  variant = 'outlined',
  sx = {},
  onChange,
  requiredMark = false, // Default to false
  error = false, // Default to false
  helperText = '', // Default to an empty string
  ...rest
}) => {
  const handleChange = (event) => {
    const { value } = event.target;

    // Check if the input is empty
    if (value === '') {
      onChange?.({
        ...event,
        target: {
          ...event.target,
          value: '', // Set value to empty string when input is cleared
        },
      });
      return;
    }

    // Parse value to number or fallback to string
    const parsedValue = rest.allowDecimal ? parseFloat(value) : parseInt(value, 10);
    onChange?.({
      ...event,
      target: {
        ...event.target,
        value: isNaN(parsedValue) ? value : String(parsedValue), // Pass as a string to comply with TextField
      },
    });
  };

  const combinedSx = {
    ...sx,
    '& input[type=number]': {
      MozAppearance: 'textfield',
      '&::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '&::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        flex: 1,
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
        type="number"
        variant={variant}
        placeholder={rest.placeholder}
        onChange={handleChange}
        sx={combinedSx}
        error={error} // Apply error state
        helperText={error ? helperText : ''} // Show helper text when error is true
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),

          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),

          style: {
            fontSize: '14px',
            fontWeight: 'normal',
            borderRadius: '0.375rem',
            backgroundColor: 'transparent',
            height: 44,
          },
        }}
      />
    </Box>
  );
};

export default GSNumberInput;
