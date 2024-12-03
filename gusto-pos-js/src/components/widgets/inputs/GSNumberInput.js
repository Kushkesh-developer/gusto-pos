import React from 'react';
import { Box, InputLabel, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';



















const GSNumberInput = ({
  label,
  startAdornment,
  endAdornment,
  variant = 'outlined',
  sx = {},
  ...rest
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        flex: 1
      }}>

      {label && <InputLabel sx={{ color: 'text.primary' }}>{label}</InputLabel>}

      <TextField
        {...rest}
        variant={variant}
        placeholder={rest.placeholder}
        sx={sx}
        slotProps={{
          input: {
            startAdornment: startAdornment &&
            <InputAdornment position="start">{startAdornment}</InputAdornment>,

            endAdornment: endAdornment &&
            <InputAdornment position="end">{endAdornment}</InputAdornment>,

            style: {
              fontSize: '14px',
              fontWeight: 'normal',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              height: 44
            }
          }
        }} />

    </Box>);

};

export default GSNumberInput;