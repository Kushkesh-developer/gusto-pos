import React, { ReactNode } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Box,
  SxProps,
  SelectChangeEvent,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectInputProps = {
  variant?: 'default' | 'elevate' | 'theme';
  options: SelectOption[] | string[];
  label?: string;
  placeholder?: string;
  helperText?: string;
  handleChange?: (_event: SelectChangeEvent<string>) => void;
  error?: boolean;
  height?: string;
  width?: string;
  sx?: SxProps;
  value?: string | null;
  placeholderColor?: 'primary' | 'secondary';
  onChange?: (_value: string | null) => void;
  renderValue?: (_value: string) => ReactNode;
  disabled?: boolean;
};

function SelectInput({
  variant = 'default',
  options,
  label,
  placeholder,
  helperText,
  handleChange,
  error,
  height = '44px',
  width = '100%',
  placeholderColor,
  sx = {},
  value,
  onChange,
  disabled,
  ...rest
}: SelectInputProps) {
  const theme = useTheme();
  const isThemed = variant === 'theme';
  const isElevateMode = variant === 'elevate';
   
  // Base styles that apply to all variants
  const baseSelectStyles = {
    height: isThemed ? '44px' : height,
    width: isThemed && placeholderColor === 'primary' ? '190px' : width,
    borderRadius: '0.375rem',
    backgroundColor: 'transparent',
    fontSize: '14px',
    '& .MuiInputLabel-root': {
      fontSize: '14px',
      marginRight: '0px',
    },
    '& .MuiInputBase-input': {
      padding: '8px 8px',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid',
      borderColor: isThemed ? alpha(theme.palette.primary.main, 0.5) : theme.palette.grey[600],
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  };

  // GS-specific styles
  const ElevateStyles = isElevateMode
    ? {
        height: '44px',
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        boxShadow: '1px 1px 2px 0px #0000001a',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
      }
    : {};

  // Theme-specific styles
  const themedStyles = isThemed
    ? {
        '& .MuiSvgIcon-root': {
          color: theme.palette.primary.main,
        },
        borderColor: placeholderColor ? theme.palette.primary.main : theme.palette.grey[600],
      }
    : {};

  // Handle change for themed variant
  const handleThemedChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    if (onChange) {
      onChange(selectedValue);
    } else if (handleChange) {
      handleChange(event);
    }
  };

  // Prepare options with support for string[] and SelectOption[]
  const processedOptions = Array.isArray(options)
    ? options.map(option => 
        typeof option === 'string' 
          ? { value: option, label: option } 
          : option
      )
    : [];

  const selectProps = {
    displayEmpty: true,
    value: value || '',
    onChange: handleThemedChange,
    sx: {
      ...baseSelectStyles,
      ...ElevateStyles,
      ...themedStyles,
      ...sx,
    },
    renderValue: (selected: string) => {
      if (!selected) {
        return (
          <Typography
            sx={{
              fontSize: '14px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '190px',
            }}
            color={isThemed && placeholderColor ? placeholderColor : 'text.secondary'}
          >
            {placeholder}
          </Typography>
        );
      }

      const selectedOption = processedOptions.find(option => option.value === selected);
      
      return (
        <Typography
          sx={{
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '190px',
          }}
          color={isThemed && placeholderColor ? placeholderColor : 'text.primary'}
        >
          {selectedOption ? selectedOption.label : selected}
        </Typography>
      );
    },
    error: error,
    ...rest,
  };

  const Wrapper: React.ElementType = isElevateMode ? FormControl : Box;
  const wrapperProps = isElevateMode
    ? {
        sx: {
          minWidth: 140,
          mr: 4,
          p: 0.5,
          ...sx,
        },
        size: 'small' as const,
      }
    : {
        sx: {
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          marginRight: '0px',
        },
      };

  return (
    <Wrapper {...wrapperProps}>
      {label && !isElevateMode && <InputLabel sx={{ color: 'text.primary' }}>{label}</InputLabel>}
      <Select {...selectProps}>
        {processedOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Wrapper>
  );
}

export default SelectInput;