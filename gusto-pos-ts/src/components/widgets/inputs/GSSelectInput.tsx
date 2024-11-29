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
  value?: string;
  placeholderColor?: string;
  onChange?: (_event: SelectChangeEvent) => void;
  renderValue?: (_value: string) => ReactNode;
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

  const selectProps = {
    displayEmpty: true,
    value: rest.value,
    onChange: rest.onChange || handleChange,
    sx: {
      ...baseSelectStyles,
      ...ElevateStyles,
      ...themedStyles,
      ...sx,
    },
    renderValue: (selected: string) =>
      selected ? (
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
          {selected}
        </Typography>
      ) : (
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
      ),
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
        {Array.isArray(options) &&
          options.map((option) =>
            typeof option === 'string' ? (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ) : (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ),
          )}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Wrapper>
  );
}

export default SelectInput;
