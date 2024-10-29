"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useDrawerContext } from "@/context/DrawerProvider";
import { Menu, useTheme, MenuItem, SelectChangeEvent } from "@mui/material";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";
import SettingsDrawer from "@/components/theme-settings/SettingsDrawer";
import Image from "next/image";

interface GSHeaderProps {
  drawerWidth: number;
}

const stores = ["Your store 1", "Your store 2"];

const GSHeader = ({ drawerWidth }: GSHeaderProps) => {
  const { handleDrawerToggle, drawerPosition } = useDrawerContext();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [store, setStore] = useState<string>(stores[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorElement);
  const router = useRouter();
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof store>) => {
    const {
      target: { value },
    } = event;
    setStore(value);
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
  };

  const handlePOS = () => {
    router.push("/stock-manager");
    handleClose();
  };

  const toggleSettingsDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

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
        ...toolbarMargin,
        borderBottom: "divider",
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: "flex",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: "none" },
            ...(drawerPosition === "right" && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ flex: 1 }}></div>

        <SettingsDrawer
          drawerOpen={drawerOpen}
          toggleDrawer={toggleSettingsDrawer}
          drawerPosition={drawerPosition}
        />

        <GSSelectInput
          value={store}
          options={stores}
          handleChange={handleChange}
        />
        <IconButton
          sx={{ backgroundColor: "#eeeeee" }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Image
            src="/est-logo.svg"
            alt="Gusto POS Logo"
            width={30}
            height={30}
            priority
          />
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
      </Toolbar>
    </AppBar>
  );
};

export default GSHeader;
