"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { theme } from '@/theme/theme';
import { Avatar } from '@mui/material';
import { useDrawerContext } from '@/context/DrawerProvider';

const GSHeader = ({ drawerWidth }) => {
    const { handleDrawerToggle } = useDrawerContext();

    return (
        <AppBar
            position="fixed"
            variant="elevation"
            elevation={0.5}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar sx={{ backgroundColor: "white", display: "flex" }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none', color: theme.palette.primary.main } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" color={theme.palette.primary.main} flex={1}>
                    Manage your POS data
                </Typography>
                <IconButton onClick={() => { }} sx={{ p: 0, backgroundColor: "#ccc" }}>
                    <Avatar alt="Remy Sharp" src="/est-logo.png" />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default GSHeader;
