"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { theme } from '@/theme/theme';
import { useDrawerContext } from '@/context/DrawerProvider';
import { Avatar, FormControl, InputLabel, Menu, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import GSSelectInput from './GSSelect';

interface GSHeaderProps {
    drawerWidth: number
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
            }}
        >
            <Toolbar sx={{ backgroundColor: "white", display: "flex" }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none', color: theme.palette.primary.main } }}
                >``
                    <MenuIcon />
                </IconButton>
                {/* Spacer */}
                <div style={{ flex: 1 }}></div>
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
