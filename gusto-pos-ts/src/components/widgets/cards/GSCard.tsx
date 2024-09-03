import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface GSCardProps {
  children: React.ReactNode;
  heading: string;
}

const GSCard = ({ children, heading }: GSCardProps) => {
  return (
    <Paper sx={{ mt: 2, mb: 2 ,borderTopRightRadius:"11px",borderTopLeftRadius:"11px"}}>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#1b3b701a",
          padding: 2,
     borderTopRightRadius:"11px",borderTopLeftRadius:"11px"
          
        }}
      >
        {heading}
      </Typography>
      {children}
    </Paper>
  );
};

export default GSCard;
