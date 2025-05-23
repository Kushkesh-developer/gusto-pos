import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'outlined' | 'contained';

  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

function CustomButton({
  variant = 'contained',

  sx,
  children,
  ...rest
}: CustomButtonProps) {
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
