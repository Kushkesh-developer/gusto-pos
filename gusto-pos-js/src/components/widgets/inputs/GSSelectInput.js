import React from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Box,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';

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
}) {
  const theme = useTheme();
  const isThemed = variant === 'theme';
  const isElevateMode = variant === 'elevate';
  const isDefault = variant === 'default';

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
<<<<<<< HEAD
    '& .MuiBox-root .css-19s7hgf': {
      gap: '0px',
    },
=======
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
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
<<<<<<< HEAD

  // Handle change for themed variant
  const handleThemedChange = (event) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(selectedValue);
    } else if (handleChange) {
      handleChange(event);
    }
  };

  // Prepare options with support for string[] and SelectOption[]
  const processedOptions = Array.isArray(options)
    ? options.map((option) =>
        typeof option === 'string' ? { value: option, label: option } : option,
      )
    : [];
=======
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea

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
<<<<<<< HEAD
    renderValue: (selected) => {
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
=======
    renderValue: (selected) =>
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
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea

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

  const Wrapper = isElevateMode ? FormControl : Box;
  const wrapperProps = isElevateMode
    ? {
        sx: {
          minWidth: 140,
          mr: 4,
          p: 0.5,
          ...sx,
        },
        size: 'small',
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
<<<<<<< HEAD
      <div>
        <Select {...selectProps}>
          {processedOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && (
          <FormHelperText
            error={error}
            sx={{
              ...(isDefault && {
                fontFamily: "'__Poppins_a43bc1', '__Poppins_Fallback_a43bc1'",
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
=======
      <Select {...selectProps}>
        {Array.isArray(options) &&
          options.map((option) =>
            typeof option === 'string' ? (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ) : (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ),
          )}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
    </Wrapper>
  );
}

export default SelectInput;
