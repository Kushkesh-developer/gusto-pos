// components/GSSwitchButton.tsx
import React from 'react';
import { Switch, SwitchProps, FormControlLabel, FormControlLabelProps } from '@mui/material';

interface GSSwitchButtonProps extends SwitchProps {
  label?: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
}

const GSSwitchButton = ({ label, labelPlacement = 'end', ...props }: GSSwitchButtonProps) => {
    return (
      <FormControlLabel
      style={{marginLeft:0}}
        control={<Switch {...props} />}
        label={label}
        labelPlacement={labelPlacement}
      />
    );
  };
  

export default GSSwitchButton;
