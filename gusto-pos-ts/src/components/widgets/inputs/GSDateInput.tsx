import React from "react";
import { InputLabel, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface DateInputProps {
  id: string;
  label: string;
  value?: Date | Dayjs;
  onChange?: (_value: Dayjs | null) => void;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
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
          value={value ? dayjs(value) : null} // Ensure value is a Dayjs object
          onChange={onChange}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error || null,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateInput;
