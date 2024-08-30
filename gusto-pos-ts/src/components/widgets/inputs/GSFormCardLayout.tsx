import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";

// import Grid from "@mui/material/Grid2";
interface FormLayoutProps {
  heading: string;
  children: React.ReactNode[];
}

const FormLayout: React.FC<FormLayoutProps> = ({ heading, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: "1135px" }}>
        <Paper
          elevation={3}
          sx={{ boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)" }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              backgroundColor: "#1b3b701a",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {heading}
          </Typography>
          <Stack
            spacing={2}
            sx={{
              padding: "30px",
            }}
          >
            {children.map((child, index) => (
              <Stack
                key={index}
                direction={{
                  xs: "column", // Stack items vertically on small screens
                  sm: "column", // Stack items vertically on medium screens
                  md: "row", // Stack items horizontally on larger screens
                }}
                spacing={2}
                sx={{ width: "100%" }}
              >
                {child}
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default FormLayout;
