import React from "react";
import {
  Switch,
  SwitchProps,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";
import { SxProps } from "@mui/system";
interface GSSwitchButtonProps extends SwitchProps {
  label?: string;
  labelPlacement?: FormControlLabelProps["labelPlacement"];
  sx?: SxProps;
  checked: boolean; // To control the switch state
  onChange: (_e: React.ChangeEvent<unknown>) => void; // Handle the change event
}

const GSSwitchButton = ({
  label,
  labelPlacement = "end",
  sx,
  checked,
  onChange,
}: GSSwitchButtonProps) => {
  return (
    <FormControlLabel
      sx={sx}
      control={<Switch checked={checked} onChange={onChange} />}
      label={label} // Keep the label empty, as we will display true/false on export
      labelPlacement={labelPlacement}
    />
  );
};

export default GSSwitchButton;
