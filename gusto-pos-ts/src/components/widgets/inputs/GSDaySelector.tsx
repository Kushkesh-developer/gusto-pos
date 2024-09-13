    import React from "react";
    import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
    import Grid from "@mui/material/Grid2";

    interface DaySelectorProps {
    selectedDays: string[];
    onChange: (day: string) => void;
    }

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const DaySelector: React.FC<DaySelectorProps> = ({ selectedDays, onChange }) => {
    const handleChange = (day: string) => {
        onChange(day);
    };

    return (
        <Box
        sx={{
            border: "1px solid #ddd",     // Outer box border
            borderRadius: "8px",          // Rounded corners
            maxWidth: "fit-content",      // Width will adjust based on content
            height: "fit-content",              // Adjust outer box height
            display: "flex",              // Flexbox to handle row layout
            alignItems: "center", 
        }}
        >
        <Grid container>
            {daysOfWeek.map((day, index) => (
            <Grid
                item
                key={day}
                sx={{
                display: "flex",   
                height: "150px",     // Flexbox for each day item
                flexDirection: "row",// Stack label above checkbox
                alignItems: "center",   // Center content horizontally
                borderLeft: index !== 0 ? "1px solid #ddd" : "none",  // Vertical line separator between items
                padding: "8px",         // Add some padding around each item
                }}
            >
                <FormControlLabel
                control={
                    <Checkbox
                    checked={selectedDays.includes(day)}
                    onChange={() => handleChange(day)}
                    sx={{ color: "blue" }} // Custom checkbox color
                    />
                }
                label={<Typography>{day}</Typography>}
                labelPlacement="top"    // Label placed above the checkbox
                />
            </Grid>
            ))}
        </Grid>
        </Box>
    );
    };

    export default DaySelector;
