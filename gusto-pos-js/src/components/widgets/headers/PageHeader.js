import React from 'react';
import { Divider, Stack, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';











export default function PageHeader(props) {
  const {
    title,
    onClose,
    children,
    sx,
    hideCloseButton = false // Default to false to show close button
  } = props;

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          ...sx
        }}>

        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        {!hideCloseButton && onClose &&
        <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      </Stack>
      {children}
      <Divider variant="fullWidth" sx={{ mb: 2 }} />
    </div>);

}