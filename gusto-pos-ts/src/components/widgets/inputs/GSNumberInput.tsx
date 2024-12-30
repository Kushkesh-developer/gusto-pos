import React, { ChangeEvent } from 'react';
import { Box, InputLabel, InputAdornment, SxProps } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type MuiNumberInputProps = {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string | number;
  value?: string | number;
  variant?: 'standard' | 'outlined' | 'filled';
  height?: string;
  width?: string;
  error?: boolean;
  sx?: SxProps;
  helperText?: string;
  min?: number;
  max?: number;
  allowDecimal?: boolean;
  requiredMark?: boolean; // New prop for required mark
  onChange?: (_event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
} & Omit<TextFieldProps, 'variant' | 'onChange' | 'value' | 'multiline' | 'rows'>;

const GSNumberInput: React.FC<MuiNumberInputProps> = ({
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
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        sx={sx}
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
