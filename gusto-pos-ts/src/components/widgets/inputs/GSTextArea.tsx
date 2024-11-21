import React, { forwardRef, useState, ChangeEvent } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputLabel, Box, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export interface GSTextAreaProps {
  className?: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string | number;
  value?: string | number;
  variant?: 'standard' | 'outlined' | 'filled';
  height?: string;
  width?: string;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
  onChange?: (_event: ChangeEvent<HTMLTextAreaElement>) => void;
  minRows?: number;
  maxRows?: number;
}

type CombinedTextAreaProps = GSTextAreaProps &
  Omit<TextFieldProps, 'variant' | 'onChange' | 'value' | 'multiline' | 'rows'>;

export const GSTextArea = forwardRef<HTMLTextAreaElement, CombinedTextAreaProps>(
  (
    {
      className,
      placeholder,
      variant = 'outlined',
      onChange,
      defaultValue,
      value,
      height = 'auto',
      label,
      error,
      helperText,
      width = '100%',
      sx = {},
      minRows = 2,
      maxRows = 10,
      ...rest
    },
    ref,
  ) => {
    const [rows, setRows] = useState(minRows);
    const [localValue, setLocalValue] = useState<string | number>(value || defaultValue || '');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const textareaLineHeight = 24; // Approximate line height in pixels
      const currentScrollHeight = event.target.scrollHeight;
      const currentRows = Math.ceil(currentScrollHeight / textareaLineHeight);

      // Update value
      const newValue = event.target.value;
      setLocalValue(newValue);

      // Dynamically adjust rows, respecting min and max
      const adjustedRows = Math.min(Math.max(currentRows, minRows), maxRows);
      setRows(adjustedRows);

      // Call additional onChange if provided
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          '& .MuiInputBase-root': {
            overflow: 'auto', // Remove vertical scrollbar
            maxHeight: `${maxRows * 24}px`, // Set a maximum height
          },
          ...sx,
        }}
      >
        {label && <InputLabel sx={{ color: 'text.primary' }}>{label}</InputLabel>}

        <TextField
          {...rest}
          inputRef={ref}
          multiline
          rows={rows}
          onChange={handleChange}
          variant={variant}
          value={localValue}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          className={className}
          slotProps={{
            input: {
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

GSTextArea.displayName = 'GSTextArea';

export default GSTextArea;
