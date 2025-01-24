import React from 'react';
import { Divider, Stack, SxProps, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type PageHeaderProps = {
  title: string;
  hideSearch?: boolean;
  children?: React.ReactNode;
  handleSearchChanges?: () => void;
  sx?: SxProps;
  onClose?: () => void;
  hideCloseButton?: boolean; // New prop to control close button visibility
};

export default function PageHeader(props: PageHeaderProps) {
  const {
    title,
    onClose,
    children,
    sx,
    hideCloseButton = false, // Default to false to show close button
  } = props;

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          ...sx,
        }}
      >
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        {!hideCloseButton && onClose && (
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Stack>
      {children}
      <Divider variant="fullWidth" sx={{ mb: 2 }} />
    </div>
  );
}
