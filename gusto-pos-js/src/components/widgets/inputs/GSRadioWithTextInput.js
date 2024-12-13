import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
// Import your GSTextInput component
import Typography from '@mui/material/Typography'; // Import Typography
<<<<<<< HEAD
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';
=======
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea

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
}) => {
  return (
    <FormControl error={error} sx={{ width: '100%' }}>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {title}
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

      <Box>
        <GSNumberInput
          sx={{ maxWidth: '300px', height: '44px' }}
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
        />
      </Box>

<<<<<<< HEAD
      {helperText && (
        <Typography
          color="error"
          sx={{
            fontFamily: '__Poppins_a43bc1, sans-serif', // Corrected font-family syntax
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
=======
      {helperText && <Typography color="error">{helperText}</Typography>}
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
    </FormControl>
  );
};

export default GSRadioWithGSTextInput;
