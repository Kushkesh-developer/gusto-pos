import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextInput from "./GSTextInput"; // Import your TextInput component
import Typography from "@mui/material/Typography"; // Import Typography

const RadioWithTextInput = () => {
  const [radioValue, setRadioValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <FormControl>
      {/* Typography for the title */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Add Total Discount
      </Typography>

      <RadioGroup
        sx={{ display: "flex", gap: "20px", mb: 1 }}
        row
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        value={radioValue}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="percentage"
          control={<Radio />}
          label="Percentage off"
        />
        <FormControlLabel
          value="flatAmount"
          control={<Radio />}
          label="Flat Amount Off"
        />
      </RadioGroup>

      {/* TextInput field below radio buttons */}
      <Box>
        <TextInput
          placeholder="Enter discount..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </Box>
    </FormControl>
  );
};

export default RadioWithTextInput;
