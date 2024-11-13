import React from "react";
import { InputLabel, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";









const DateInput = ({
  id,
  label,
  value,
  onChange,
  error
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          minWidth: "50%",
          display: "flex",
          flexDirection: "column",
          gap: 1
          // height: "44px", // Set the default height to 44px here
        }}>

        <InputLabel htmlFor={id} sx={{ color: "text.primary" }}>
          {label}
        </InputLabel>
        <DatePicker
          value={value ? dayjs(value) : null} // Ensure value is a Dayjs object
          onChange={onChange}
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "10.5px 14px" // Adjusts padding inside the input
            }
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error || null
              // height:"44px",
            }
          }} />

      </Box>
    </LocalizationProvider>);

};

export default DateInput;