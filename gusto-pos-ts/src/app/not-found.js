'use client';
import { Button, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';

import ThemeProvider from '@/context/ThemeProvider';
import { LocalizationProvider, useLocalization } from '@/context/LocalizationProvider';

const Custom404Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { translate } = useLocalization();

  useEffect(() => {
    setMounted(true);
    const loggedIn =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('loggedIn='))
        ?.split('=')[1] === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <LocalizationProvider>
        <Grid
          container
          sx={{
            height: '100vh',
            maxWidth: '600px',
            mx: 'auto',
            px: 2,
            backgroundColor: (theme) => theme.palette.background.default,
          }}
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '10rem', sm: '8rem' },
                color: theme.palette.primary.main, // Theme color for 404
                fontWeight: theme.typography.fontWeightBold,
              }}
              align="center"
            >
              {translate('404')}
            </Typography>
          </Grid>
          <Grid>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontSize: { xs: '2.4rem', sm: '2.0rem' },
                color: theme.palette.text.primary, // Adjusts to white in dark mode
              }}
            >
              {translate('oops_page_not_found')}
            </Typography>
          </Grid>
          <Grid>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontSize: { xs: '0.8rem', sm: '1.15rem' },
                color: theme.palette.text.primary, // Adjusts to white in dark mode
                mb: (theme) => theme.spacing(2),
              }}
            >
              {translate('sorry_message')}
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
              onClick={handleButtonClick}
            >
              {isLoggedIn ? translate('return_to_home') : translate('return_to_login')}
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Custom404Page;
