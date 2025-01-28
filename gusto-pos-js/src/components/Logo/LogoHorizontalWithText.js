import React from 'react';
import { Box, useTheme } from '@mui/material';
import ThemeTextLogo from '@/public/theme-logo.svg';
import ThemeLogo from '@/public/logo-icon.svg';
function LogoHorizontalWithText() {
  const theme = useTheme();
  const logoColor = theme.palette.mode === 'dark' ? '#fff' : '#0c1f4e';

  return (
    <Box sx={{ background: 'transparent', marginTop: 2, zIndex: 1, width: 100, marginBottom: 5 }}>
      <ThemeLogo style={{ width: '100%' }} fill={logoColor} />
      <ThemeTextLogo style={{ width: '100%' }} fill={logoColor} />
    </Box>
  );
}

export default LogoHorizontalWithText;
