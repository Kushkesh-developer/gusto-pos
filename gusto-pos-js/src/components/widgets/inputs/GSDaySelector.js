import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocalization } from "@/context/LocalizationProvider";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const GSDaySelector = ({ selectedDays, onChange }) => {
  // Handle the selection change
  const { translate } = useLocalization();
  const handleDaySelection = (event, newSelectedDays) => {
    // console.log(newSelectedDays, "showing array");
    if (newSelectedDays.length > selectedDays.length) {
      // Find the day that was added
      const addedDay = newSelectedDays.find(
        (day) => !selectedDays.includes(day),
      );
      if (addedDay) onChange(addedDay);
    } else {
      // Find the day that was removed
      const removedDay = selectedDays.find(
        (day) => !newSelectedDays.includes(day),
      );
      if (removedDay) onChange(removedDay);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Apply the days
      </Typography>
      <ToggleButtonGroup
        value={selectedDays}
        onChange={handleDaySelection}
        aria-label={translate("days_of_week")}
        // sx={{ mt: 2 }} // Add margin-top here
      >
        {daysOfWeek.map((day) => (
          <ToggleButton key={day} value={day}>
            {day}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default GSDaySelector;
