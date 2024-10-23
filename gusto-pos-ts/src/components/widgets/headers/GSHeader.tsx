"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useDrawerContext } from "@/context/DrawerProvider";
import {
  Avatar,
  Menu,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  Typography,
} from "@mui/material";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";
import DisplayModeSwitch from "../switch/DisplayModeSwitch";
import { useThemeContext } from "@/context/ThemeProvider";
import SettingsIcon from "@mui/icons-material/Settings"; // Import the Settings icon
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface GSHeaderProps {
  drawerWidth: number;
}

const stores = ["Your store 1", "Your store 2"];

const GSHeader = ({ drawerWidth }: GSHeaderProps) => {
  const { handleDrawerToggle, drawerPosition, toggleDrawerPosition } =
    useDrawerContext();
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );
  const [store, setStore] = React.useState<string>(stores[0]);
  const open = Boolean(anchorElement);
  const router = useRouter();
  const theme = useTheme();
  const { changeThemeManually, prefersDarkMode } = useThemeContext();
  const [settingsAnchor, setSettingsAnchor] =
    React.useState<null | HTMLElement>(null);
  const settingsOpen = Boolean(settingsAnchor);

  const handleChange = (event: SelectChangeEvent<typeof store>) => {
    const {
      target: { value },
    } = event;
    setStore(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
    setSettingsAnchor(null);
  };

  const handleLogout = () => {
    Cookie.remove("email");
    router.push("/login");
    handleClose();
  };

  const handlePOS = () => {
    router.push("/stock-manager");
    handleClose();
  };

  // Determine margin for toolbar based on drawer position
  const toolbarMargin = {
    ml: { sm: drawerPosition === "left" ? `${drawerWidth}px` : "0" },
    mr: { sm: drawerPosition === "right" ? `${drawerWidth}px` : "0" },
  };

  return (
    <AppBar
      position="fixed"
      variant="elevation"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ...toolbarMargin, // Apply dynamic margins here
        borderBottom: "divider",
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: "flex",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: "none", color: theme.palette.primary.main },
            ...(drawerPosition === "right" && { display: "none" }), // Hide the menu button when the drawer is on the right
          }}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ flex: 1 }}></div>

        {/* Settings Icon Button */}
        <IconButton onClick={handleSettingsClick} sx={{ mr: 2 }}>
          <SettingsIcon />
        </IconButton>

        {/* Settings Menu */}
        <Menu
          anchorEl={settingsAnchor}
          open={settingsOpen}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              toggleDrawerPosition(); // Toggle the drawer position
              handleClose(); // Close the settings menu
            }}
          >
            <Typography>Toggle Drawer Position</Typography>
            <IconButton sx={{ ml: 1 }}>
              <SwapHorizIcon /> {/* Icon for toggling drawer position */}
            </IconButton>
          </MenuItem>
        </Menu>

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
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
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
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handlePOS}>POS</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default GSHeader;
