import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Typography } from '@mui/material';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';

interface RadioWithGSTextInputProps {
  title: string;
  radioOptions: { value: string; label: string }[];
  placeholder: string;
  radioValue: string;
  inputValue: string;
  onRadioChange: (_type: string) => void;
  onInputChange: (_value: string) => void;
  error?: boolean;
  helperText?: string;
  requiredMark?: boolean;
}

const GSRadioWithGSTextInput = ({
  title,
  radioOptions,
  placeholder,
  radioValue,
  inputValue,
  onRadioChange,
  onInputChange,
  error,
  helperText,
  requiredMark,
}: RadioWithGSTextInputProps) => {
  return (
    <FormControl error={error} sx={{ width: { xs: '100%', sm: '100%', md: '272px', xl: '100%' } }}>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {title}{' '}
        {requiredMark && (
          <Typography component="span" sx={{ marginLeft: '4px' }}>
            *
          </Typography>
        )}
      </Typography>

      <RadioGroup
        sx={{ display: 'flex', mb: 1 }}
        row
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        value={radioValue}
        onChange={(event) => onRadioChange(event.target.value)}
      >
        {radioOptions.map((option) => (
          <FormControlLabel
            sx={{ marginLeft: '0px' }}
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      <div>
        <GSNumberInput
          sx={{
            maxWidth: '300px',
            height: '44px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: error ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: error ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
              },
              '&.Mui-focused fieldset': {
                borderColor: error ? '#d32f2f' : 'primary.main',
              },
            },
          }}
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          error={error}
        />
      </div>

      {helperText && (
        <Typography
          color="error"
          sx={{
            fontWeight: '400',
            fontSize: '0.75rem',
            lineHeight: 1.66,
            textAlign: 'left',
            marginTop: '3px',
            marginRight: '14px',
            marginBottom: '0',
            marginLeft: '14px',
          }}
        >
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default GSRadioWithGSTextInput;
