// components/MenuHeader.tsx
'use client';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useDrawerContext } from '@/context/DrawerProvider';
import { Menu, MenuItem, SelectChangeEvent, useTheme, Fab, alpha } from '@mui/material';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import SelectInput from '@/components/widgets/inputs/GSSelectInput';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from 'next/image';
import SettingsDrawer from '@/components/theme-settings/SettingsDrawer';
import LanguageToggle from '@/components/theme-settings/LanguageToggle';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';

const stores = ['Your store 1', 'Your store 2'];

const MenuHeader = ({ drawerWidth }: { drawerWidth: number }) => {
  const { handleDrawerToggle, drawerPosition } = useDrawerContext();
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
  const [store, setStore] = React.useState<string>(stores[0]);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the SettingsDrawer
  const open = Boolean(anchorElement);
  const router = useRouter();
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof store>) => {
    setStore(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleLogout = () => {
    Cookie.remove('email');
    router.push('/login');
    handleClose();
  };

  const handlePOS = () => {
    router.push('/stock-manager');
    handleClose();
  };

  const toolbarMargin = {
    ml: { sm: drawerPosition === 'left' ? `${drawerWidth}px` : '0' },
    mr: { sm: drawerPosition === 'right' ? `${drawerWidth}px` : '0' },
  };

  return (
    <AppBar
      position="fixed"
      variant="elevation"
      elevation={0}
      sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ...toolbarMargin }}
    >
      <Toolbar
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: 'none', color: theme.palette.primary.main },
          }}
        >
          <MenuIcon />
        </IconButton>
        <SelectInput
          value={store}
          options={stores.map((storeName) => ({ value: storeName, label: storeName }))}
          onChange={handleChange}
        />
        <div style={{ flex: 1 }}></div>
        <LanguageToggle
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        />
        <SettingsDrawer
          drawerOpen={drawerOpen}
          toggleDrawer={(open) => setDrawerOpen(open)}
          drawerPosition={drawerPosition}
        />
        <Fab
          color="primary"
          aria-label="settings"
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: 'fixed',
            bottom: theme.spacing(4),
            right: theme.spacing(4),
            zIndex: 1300, // Ensure it appears on top
            // animation: "rotate 2s linear infinite",
            '@keyframes rotate': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        >
          <SettingsIcon
            onClick={() => setDrawerOpen(true)}
            sx={{
              fontSize: '2rem',
              cursor: 'pointer',
            }}
          />
        </Fab>
        {/* <SettingsIcon /> */}

        <div>
          <IconButton
            sx={{ mr: 2 }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            // variant="outlined"
            aria-expanded={open ? 'true' : undefined}
            onClick={handlePOS}
          >
            <ImportantDevicesIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <IconButton
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              height: 44,
              width: 44,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              border: '2px solid',
              borderColor: alpha(theme.palette.primary.main, 0.6),
            }}
          >
            <Image src="/est-logo.svg" alt="Gusto POS Logo" width={30} height={30} priority />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorElement}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem sx={{ display: { md: 'none' } }} onClick={handlePOS}>
              <LanguageToggle />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MenuHeader;
