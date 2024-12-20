import React from 'react';
import {
  Divider,
  Stack,

  Typography,
  IconButton,
  useMediaQuery } from

'@mui/material';
import CloseIcon from '@mui/icons-material/Close';










export default function PageHeader(props) {
  const { title, onClose, children, sx } = props;

  // Check if the screen width is below 900px
  const isBelow900px = useMediaQuery((theme) => theme.breakpoints.down(900));

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          ...sx // Spread custom styles if provided
        }}>

        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        {isBelow900px &&
        onClose && // Show close icon for screens below 900px
        <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
        }
      </Stack>
      {children}
      <Divider variant="fullWidth" sx={{ mb: 2 }} />
    </div>);

}