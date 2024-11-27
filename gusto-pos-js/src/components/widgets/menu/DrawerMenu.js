'use client';
import React from 'react';
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useDrawerContext } from '@/context/DrawerProvider';
import NavigationMenu from '@/constants/navigation';
import DrawerMenuItem from '@/components/widgets/menu/DrawerMenuItem';
import Image from 'next/image';

const DrawerMenu = () => {
  const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd, drawerPosition } =
  useDrawerContext();
  const navigationMenu = NavigationMenu();

  const drawerContent =
  <div>
      <Toolbar>
        <Image
        src="/logo-icon.svg"
        alt="Gusto POS Logo"
        width={22}
        height={22}
        priority
        style={{ marginTop: 20, marginRight: 0 }} />

        <Image
        src="/theme-logo.svg"
        alt="Gusto POS Logo"
        width={180}
        height={20}
        priority
        style={{ marginTop: 20 }} />

      </Toolbar>
      <List>
        {navigationMenu.map((section) =>
      <Box>
            <Box sx={{ px: 1, mb: 1, mt: 2 }}>
              <Typography sx={{ mb: 1 }} fontWeight={'500'} color="text.secondary">
                {section.section}
              </Typography>
              <Divider />
            </Box>
            {section.items.map((menu) =>
        <DrawerMenuItem key={menu.name} menu={menu} />
        )}
          </Box>
      )}
      </List>
    </div>;


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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 }
        }}>

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
            backgroundColor: 'background.paper'
          }
        }}
        open>

        {drawerContent}
      </Drawer>
    </Box>);

};

export default DrawerMenu;