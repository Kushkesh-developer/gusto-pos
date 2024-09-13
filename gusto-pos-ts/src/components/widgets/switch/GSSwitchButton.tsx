import React from 'react';
import { Switch, SwitchProps, FormControlLabel, FormControlLabelProps } from '@mui/material';
import { SxProps } from '@mui/system';

interface GSSwitchButtonProps extends SwitchProps {
  label?: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  sx?: SxProps; // Retain the sx prop
}

const GSSwitchButton = ({ label, labelPlacement = 'end', sx, ...props }: GSSwitchButtonProps) => {
    return (
      <FormControlLabel
        sx={sx} // Apply only the sx styles passed from the parent
        control={<Switch {...props} />}
        label={label}
        labelPlacement={labelPlacement}
      />
    );
  };

export default GSSwitchButton;



