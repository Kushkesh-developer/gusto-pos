"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { theme } from "@/theme/theme";
import { useDrawerContext } from "@/context/DrawerProvider";
import { Avatar, Menu, MenuItem, SelectChangeEvent } from "@mui/material";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";

const stores = ["Your store 1", "Your store 2"];

const GSHeader = ({ drawerWidth }) => {
  const { handleDrawerToggle } = useDrawerContext();
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [store, setStore] = React.useState(stores[0]);

  const open = Boolean(anchorElement);
  const router = useRouter();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStore(value);
  };
  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleLogout = () => {
    Cookie.remove("email");
    router.push("/login");
    handleClose();
  };

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
          sx={{
            mr: 2,
            display: { sm: "none", color: theme.palette.primary.main },
          }}
        >
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
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default GSHeader;
