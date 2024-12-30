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
  value?: string | null;
  label: string;
};

type SelectInputProps = {
  variant?: 'default' | 'elevate' | 'theme';
  options?: SelectOption[] | string[];
  label?: string;
  placeholder?: string;
  helperText?: string;
  // handleChange?: (_event: SelectChangeEvent<string>) => void;
  error?: boolean;
  height?: string;
  width?: string;
  sx?: SxProps;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value?: string | null;
  onChange?: (_value: string | null) => void;
  placeholderColor?: 'primary' | 'secondary';
  renderValue?: (_value: string) => ReactNode;
  requiredMark?: boolean;
};

function SelectInput({
  variant = 'default',
  options,
  label,
  placeholder,
  helperText,
  // handleChange,
  error,
  height = '44px',
  width = '100%',
  placeholderColor,
  requiredMark = false,
  sx = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  onChange,
  ...rest
}: SelectInputProps) {
  const theme = useTheme();
  const isThemed = variant === 'theme';
  const isElevateMode = variant === 'elevate';
  const isDefault = variant === 'default';

  // Base styles that apply to all variants
  const baseSelectStyles = {
    height: isThemed ? '44px' : height,
    width: isThemed && placeholderColor === 'primary' ? { xs: 'fitContent', md: '190px' } : width,
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
    '& .MuiBox-root .css-19s7hgf': {
      gap: '0px',
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
    // eslint-disable-next-line no-unused-vars
    const selectedValue = event.target.value || null; // Ensure null if value is empty
    if (onChange) {
      onChange(selectedValue);
    }
  };

  // Prepare options with support for string[] and SelectOption[]
  const processedOptions: SelectOption[] = Array.isArray(options)
    ? options.map((option) =>
        typeof option === 'string'
          ? { _value: option, label: option }
          : { ...option, _value: option.value || option.label },
      )
    : [];

  const selectProps = {
    displayEmpty: true,
    // eslint-disable-next-line no-unused-vars
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

      const selectedOption = processedOptions.find((option) => option.value === selected);

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
      {label && !isElevateMode && (
        <InputLabel sx={{ color: 'text.primary' }}>
          {label}
          {requiredMark && <span style={{ marginLeft: '4px' }}>*</span>}
        </InputLabel>
      )}
      <div>
        <Select {...selectProps}>
          {processedOptions.map((option) => (
            <MenuItem key={option.value || undefined} value={option.value || ''}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && (
          <FormHelperText
            error={error}
            sx={{
              ...(isDefault && {
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: 1.66,
                textAlign: 'left',
                marginTop: '3px',
                marginBottom: 0,
                marginLeft: '14px',
                marginRight: '14px',
              }),
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </div>
    </Wrapper>
  );
}

export default SelectInput;
