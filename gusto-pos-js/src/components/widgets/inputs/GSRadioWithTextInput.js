import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextInput from "./GSTextInput"; // Import your TextInput component
import Typography from "@mui/material/Typography"; // Import Typography

const RadioWithTextInput = ({
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
    <FormControl error={error} sx={{ width: "100%" }}>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {title}
      </Typography>

      <RadioGroup
        sx={{ display: "flex", gap: "20px", mb: 1 }}
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
        <TextInput
          sx={{ maxWidth: "300px", height: "44px" }}
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
        />
      </Box>

      {helperText && <Typography color="error">{helperText}</Typography>}
    </FormControl>
  );
};

export default RadioWithTextInput;
