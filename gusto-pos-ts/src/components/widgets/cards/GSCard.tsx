import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface GSCardProps {
  children: React.ReactNode;
  heading: string;
}

const GSCard = ({ children, heading }: GSCardProps) => {
  return (
    <Paper
      elevation={3}
      sx={{ boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)", margin: "20px 0px" }}
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
      {children}
    </Paper>
  );
};

export default GSCard;
