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

  onChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<TextFieldProps, 'variant' | 'onChange' | 'value' | 'multiline' | 'rows'>;

const GSNumberInput: React.FC<MuiNumberInputProps> = ({
  label,
  startAdornment,
  endAdornment,
  variant = 'outlined',
  sx = {},
  ...rest
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        flex: 1,
      }}
    >
      {label && <InputLabel sx={{ color: 'text.primary' }}>{label}</InputLabel>}

      <TextField
        {...rest}
        variant={variant}
        placeholder={rest.placeholder}
        sx={sx}
        slotProps={{
          input: {
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
          },
        }}
      />
    </Box>
  );
};

export default GSNumberInput;
