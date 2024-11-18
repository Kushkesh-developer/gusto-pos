import React from 'react';
import { Typography, Paper, alpha, useTheme } from '@mui/material';

interface GSCardProps {
  children: React.ReactNode;
  heading: React.ReactNode;
}

const GSCard = ({ children, heading }: GSCardProps) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        mt: 2,
        mb: 2,
        borderTopRightRadius: '11px',
        borderTopLeftRadius: '11px',
      }}
      variant="outlined"
    >
      <Typography
        variant="subtitle1"
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderTopRightRadius: '11px',
          borderTopLeftRadius: '11px',
          py: '16px',
          px: '14px',
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
