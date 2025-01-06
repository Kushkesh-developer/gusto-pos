'use client';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import { useDrawerContext, DrawerProvider } from '@/context/DrawerProvider'; // Ensure this is the correct path
import MenuHeader from '@/components/widgets/headers/MenuHeader';
import DrawerMenu from '@/components/widgets/menu/DrawerMenu';
import { useLocalization } from '@/context/LocalizationProvider';

export default function RootLayout({ children }) {
  const drawerWidth = 280;

  return (
    <DrawerProvider>
      <RootLayoutWithDrawer drawerWidth={drawerWidth}>{children}</RootLayoutWithDrawer>
    </DrawerProvider>);

}

function RootLayoutWithDrawer({
  children,
  drawerWidth



}) {
  const { drawerPosition, mobileOpen } = useDrawerContext(); // Get the current drawer position (left or right)
  const { translate } = useLocalization();
  return (
    <Box sx={{ flex: '1 1 auto', p: { xs: 2, md: 3 } }}>
      <CssBaseline />
      <MenuHeader drawerWidth={drawerWidth} />
      <DrawerMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // minHeight: "100vh",
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'unset',
          marginTop: '55px',
          display: {
            xs: 'block',
            lg: 'flex'
          },
          marginLeft: {
            xs: 0, // No margin on mobile
            lg: drawerPosition === 'left' ? '232px' : '-50px'
          },
          marginRight: {
            xs: 0, // No margin on mobile
            lg: drawerPosition === 'right' ? `${drawerWidth}px` : 0
          },
          transition: 'margin 0.3s ease-in-out' // Smooth transition for margin changes
        }}>

        {mobileOpen ? null : <Toolbar sx={{ display: { xs: 'none', lg: 'block' } }} />}
        <Box sx={{ flexGrow: 1, flexDirection: 'column' }}>
          {children}
          <Typography
            fontSize={12}
            textAlign={'center'}
            sx={{
              mt: 2,
              p: 1
            }}
            color={'text.secondary'}>

            {translate('copyright_text')}
          </Typography>
        </Box>
      </Box>
    </Box>);

}