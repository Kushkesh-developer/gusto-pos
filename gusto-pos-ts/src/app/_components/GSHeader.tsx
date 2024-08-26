"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { theme } from '@/theme/theme';
import { useDrawerContext } from '@/context/DrawerProvider';
import { Avatar, Menu, MenuItem } from '@mui/material';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

interface GSHeaderProps {
    drawerWidth: number
}

const GSHeader = ({drawerWidth}: GSHeaderProps) => {
    const { handleDrawerToggle } = useDrawerContext();
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorElement);
    const router = useRouter();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElement(null);
    };

    const handleLogout = () => {
        Cookie.remove("email");
        router.push("/login");
        handleClose();
    }

    return (
        <AppBar
            position="fixed"
            variant="elevation"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar sx={{backgroundColor: "white", display: "flex"}}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none', color: theme.palette.primary.main } }}
                >``
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" color={theme.palette.primary.main} flex={1}>
                    Manage your POS data
                </Typography>
                <IconButton
                    sx={{ p: 0, backgroundColor: "#ccc" }}
                    aria-controls={open ? 'basic-menu' : undefined} 
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                  <Avatar alt="Remy Sharp" src="/est-logo.png" />
                </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElement}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default GSHeader;
