'use client';
import React from 'react';
import { alpha, Box, Divider, Drawer, List, Toolbar, Typography, useTheme } from '@mui/material';
import { useDrawerContext } from '@/context/DrawerProvider';
import NavigationMenu from '@/constants/navigation';
import DrawerMenuItem from '@/components/widgets/menu/DrawerMenuItem';
import Image from 'next/image';

const DrawerMenu = () => {
  const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd, drawerPosition } =
    useDrawerContext();
  const navigationMenu = NavigationMenu();
  const theme = useTheme();
  const drawerContent = (
    <div>
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              theme.palette.mode == 'dark'
                ? `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.3)} 0%, rgba(0,0,0,0) 65%)`
                : 'none',
            pointerEvents: 'none', // Prevent interactions
            animation: 'fadeIn 2s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        />
        <Box sx={{ background: 'transparent', marginTop: 2, zIndex: 1 }}>
          <Image src="/logo-icon.svg" alt="Gusto POS Logo" width={22} height={22} priority />
          <Image src="/theme-logo.svg" alt="Gusto POS Logo" width={180} height={20} priority />
        </Box>
      </Toolbar>
      <List>
        {navigationMenu.map((section) => (
          <Box>
            <Box sx={{ px: 1, mb: 1, mt: 2 }}>
              <Typography sx={{ mb: 1 }} fontWeight={'500'} color="text.secondary">
                {section.section}
              </Typography>
              <Divider />
            </Box>
            {section.items.map((menu) => (
              <DrawerMenuItem key={menu.name} menu={menu} />
            ))}
          </Box>
        ))}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        anchor={drawerPosition} // Correctly position drawer based on state
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        anchor={drawerPosition} // Correctly position drawer based on state
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: 'background.paper',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default DrawerMenu;
