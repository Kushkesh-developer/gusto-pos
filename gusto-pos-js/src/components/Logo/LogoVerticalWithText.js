import React from 'react';
import { Box, useTheme } from '@mui/material';
import ThemeTextLogo from '@/public/theme-logo.svg';
import ThemeLogo from '@/public/logo-icon.svg';
function LogoVerticalWithText() {
  const theme = useTheme();
  const logoColor = theme.palette.mode === 'dark' ? '#fff' : '#0c1f4e';

  return (
    <Box sx={{ background: 'transparent', marginTop: 2, zIndex: 1 }}>
      <ThemeLogo style={{ height: 24, fontSize: 14 }} fill={logoColor} />
      <ThemeTextLogo
        style={{ height: 20, width: 180, fontSize: 14 }}
        width={180}
        fill={logoColor}
      />
    </Box>
  );
}

export default LogoVerticalWithText;
