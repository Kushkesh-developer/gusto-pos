import React from "react";
import { TextField, InputLabel, Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UseFormRegister } from "react-hook-form";

interface DateInputProps {
  id: string;
  label: string;
  register?: UseFormRegister<any>;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  register,
  error,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          minWidth: "50%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <InputLabel htmlFor={id} sx={{ color: "text.primary" }}>
          {label}
        </InputLabel>
        <DatePicker
          {...register(id, { valueAsDate: true })}
          renderInput={(params: _any) => (
            <TextField {...params} fullWidth error={!!error} />
          )}
          sx={{
            "& .MuiOutlinedInput-root .MuiInputBase-input": {
              padding: "11.5px 14px;",
              fontSize: "14px",
              fontWeight: "normal",
              height: "25px",
            },
          }}
        />
        {error && (
          <Typography color="error" variant="caption">
            {error}
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default DateInput;
