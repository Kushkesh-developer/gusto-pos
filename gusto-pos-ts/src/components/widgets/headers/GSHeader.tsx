"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useDrawerContext } from '@/context/DrawerProvider';
import { Avatar, Menu, MenuItem, SelectChangeEvent, useTheme } from '@mui/material';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import GSSelectInput from '@/components/widgets/inputs/GSSelect';
import DisplayModeSwitch from '../switch/DisplayModeSwitch';
import { useThemeContext } from '@/context/ThemeProvider';

interface GSHeaderProps {
    drawerWidth: number
}

const stores = [
    'Your store 1',
    'Your store 2',
];


const GSHeader = ({ drawerWidth }: GSHeaderProps) => {
    const { handleDrawerToggle } = useDrawerContext();
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const [store, setStore] = React.useState<string>(stores[0]);
    const open = Boolean(anchorElement);
    const router = useRouter();
    const theme = useTheme()
    const { changeThemeManually, prefersDarkMode } = useThemeContext()
    

    const handleChange = (event: SelectChangeEvent<typeof store>) => {
        const {
            target: { value },
        } = event;
        setStore(value)
    };
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
                borderBottom: "divider",
            }}
        >
            <Toolbar sx={{ backgroundColor: theme.palette.background.paper, display: "flex" }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none', color: theme.palette.primary.main } }}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{ flex: 1 }}></div>
                <DisplayModeSwitch
                    sx={{ mr: 2 }}
                    checked={prefersDarkMode}
                    onChange={() => changeThemeManually()}
                />
                <GSSelectInput
                    value={store}
                    options={stores}
                    handleChange={handleChange}
                />
                <div>
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
            </div>
            </Toolbar>
        </AppBar>
    );
};

export default GSHeader;
