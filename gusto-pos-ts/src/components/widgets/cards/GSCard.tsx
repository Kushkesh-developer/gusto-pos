import React from "react";
import { Typography, Paper } from "@mui/material";

interface GSCardProps {
  children: React.ReactNode;
  heading: string;
}

const GSCard = ({ children, heading }: GSCardProps) => {
  return (
    <Paper
      sx={{
        mt: 2,
        mb: 2,
        borderTopRightRadius: "11px",
        borderTopLeftRadius: "11px",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          backgroundColor: "#1b3b701a",
          borderTopRightRadius: "11px",
          borderTopLeftRadius: "11px",
          py: "16px",
          px: "14px",
          lineHeight: 1.5,
        }}
      >
        {heading}
      </Typography>
      {children}
    </Paper>
  );
};

export default GSCard;
