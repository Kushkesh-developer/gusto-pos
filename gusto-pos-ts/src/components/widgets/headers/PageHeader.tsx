import React from 'react';
import { Divider, Stack, SxProps, Typography, IconButton, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

type PageHeaderProps = {
  title: string;
  hideSearch?: boolean;
  children?: React.ReactNode;
  handleSearchChanges?: () => void;
  sx?: SxProps;
  onClose?: () => void;
  showMobileView?: boolean; // Changed to boolean
};

export default function PageHeader(props: PageHeaderProps) {
  const {
    title,
    onClose,
    children,
    sx,
    showMobileView, // Default to true for backward compatibility
  } = props;
  let isBelow900px = false;
  if (showMobileView) {
    isBelow900px = useMediaQuery((theme: Theme) => theme.breakpoints.down(900));
  }

  // Only show mobile view if both conditions are true
  const shouldShowMobileView = isBelow900px && showMobileView;

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
        {shouldShowMobileView && onClose && (
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
