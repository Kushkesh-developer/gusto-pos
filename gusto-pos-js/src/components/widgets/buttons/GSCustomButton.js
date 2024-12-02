import React from 'react';
import { Button, useTheme } from '@mui/material';

function CustomButton({
  variant = 'contained',

  sx,
  children,
  ...rest
}) {
  const theme = useTheme();

  const variantStyles =
    variant === 'outlined'
      ? {
          color: 'text.primary',
          borderColor: theme.palette.primary.main,
        }
      : {
          backgroundColor: theme.palette.primary.main,
        };

  return (
    <Button variant={variant} sx={{ ...variantStyles, ...sx }} {...rest}>
      {children}
    </Button>
  );
}

export default CustomButton;
