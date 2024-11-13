import React from "react";
import {
  Switch,

  FormControlLabel } from

"@mui/material";










const GSSwitchButton = ({
  label,
  labelPlacement = "end",
  sx,
  checked,
  onChange
}) => {
  return (
    <FormControlLabel
      sx={sx}
      control={<Switch checked={checked} onChange={onChange} />}
      label={label} // Keep the label empty, as we will display true/false on export
      labelPlacement={labelPlacement} />);


};

export default GSSwitchButton;