import { AppBar, Breadcrumbs, IconButton, Link, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useLocalization } from '@/context/LocalizationProvider';

export default function StockHeader() {
  const { translate } = useLocalization();
  return (
    <AppBar
      position="static"
      variant="outlined"
      sx={{
        height: 70,
        position: 'sticky',
        zIndex: 10,
        top: 0,
        '&.MuiToolbar-root': { backgroundColor: 'white' },
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            history.back();
          }}
        >
          <ArrowBack />
        </IconButton>
        <Stack>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {translate('pos')}
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator="›"
            sx={{ '& .MuiBreadcrumbs-li': { fontSize: 14 } }}
          >
            <Link underline="hover" color="text.disabled" href="/dashboard">
              {translate('dashboard')}
            </Link>
            <Typography sx={{ color: 'white', fontSize: 14 }}>{translate('pos')}</Typography>
          </Breadcrumbs>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
