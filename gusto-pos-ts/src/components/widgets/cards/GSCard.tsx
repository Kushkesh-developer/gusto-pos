import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface GSCardProps {
  children: React.ReactNode;
  heading: string;
}

const GSCard = ({ children, heading }: GSCardProps) => {
  return (
    <Paper sx={{ mt: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#1b3b701a",
          padding: 3,
          borderRadius: 2,
        }}
      >
        {heading}
      </Typography>
      {children}
    </Paper>
  );
};

export default GSCard;
