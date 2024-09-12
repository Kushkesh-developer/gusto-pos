import React from 'react';
import { Switch, SwitchProps, FormControlLabel, FormControlLabelProps } from '@mui/material';
import { SxProps } from '@mui/system';

interface GSSwitchButtonProps extends SwitchProps {
  label?: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  sx?: SxProps;
}

const GSSwitchButton = ({ label, labelPlacement = 'end', sx, ...props }: GSSwitchButtonProps) => {
    return (
      <FormControlLabel
        sx={{
          display: 'block',
          marginTop: '20px !important',
          marginLeft: 0,
          ...sx
        }}
        control={<Switch {...props} />}
        label={label}
        labelPlacement={labelPlacement}
      />
    );
  };

export default GSSwitchButton;


