import React from 'react';
import Button from '@mui/material/Button';

interface GSActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  startIcon?: React.ReactNode;
  sx?: object;
}

const GSActionButton = ({
  label,
  onClick,
  variant = 'outlined',
  startIcon,
  sx = { marginRight: '0px' },
}: GSActionButtonProps) => {
  return (
    <Button variant={variant} onClick={onClick} startIcon={startIcon} {...(sx && { sx })}>
      {label}
    </Button>
  );
};

export default GSActionButton;
