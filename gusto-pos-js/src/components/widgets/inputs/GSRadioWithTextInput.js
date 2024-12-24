import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography'; // Import Typography
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';

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
}) => {
  return (
    <FormControl error={error} sx={{ width: '100%' }}>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {title}{' '}
        {requiredMark && (
          <Typography component="span" sx={{ marginLeft: '4px' }}>
            *
          </Typography>
        )}
      </Typography>

      <RadioGroup
        sx={{ display: 'flex', gap: '20px', mb: 1 }}
        row
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        value={radioValue}
        onChange={(event) => onRadioChange(event.target.value)}
      >
        {radioOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      <div>
        <GSNumberInput
          sx={{ maxWidth: '300px', height: '44px' }}
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
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
