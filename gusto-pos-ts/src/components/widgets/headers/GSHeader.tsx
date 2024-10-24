"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useDrawerContext } from "@/context/DrawerProvider";
import {
  Avatar,
  Menu,
  Stack,
  Box,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  Typography,
} from "@mui/material";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";
import DisplayModeSwitch from "../switch/DisplayModeSwitch";
import SettingsIcon from "@mui/icons-material/Settings"; // Import the Settings icon

import { Drawer, FormControl, FormLabel } from "@mui/material";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { useThemeContext } from "@/context/ThemeProvider";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
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
  const { changePrimaryColor } = useThemeContext();
  const handleChange = (event: SelectChangeEvent<typeof store>) => {
    const {
      target: { value },
    } = event;
    setStore(value);
  };

  // const [drawerPosition, setDrawerPosition] = useState("left"); // Control drawer position
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle Drawer Open/Close
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
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

        <div>
          {/* Button to open Settings Drawer */}

          <SettingsIcon
            onClick={toggleDrawer(true)}
            sx={{
              marginRight: "10px",
              marginTop: "2px",
              fontSize: "2rem",
              cursor: "pointer",
              color: "primary.main",
              animation: "rotate 2s linear infinite", // 2-second continuous rotation
              "@keyframes rotate": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "100%": {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />

          {/* Drawer for Settings Panel */}
          <Drawer
            anchor={drawerPosition === "left" ? "right" : "left"}
            open={drawerOpen}
            sx={{
              color: theme.palette.primary.main,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",

                backgroundColor: "background.paper",
              },
            }}
            onClose={toggleDrawer(false)}
          >
            <div
              style={{
                padding: 20,
                width: 300,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <Typography sx={{ marginTop: "8px", color: "primary.main" }}>
                Theme Settings
              </Typography>

              {/* Layout Options */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Switch Theme</FormLabel>
                <DisplayModeSwitch />
              </FormControl>

              {/* Drawer Position Toggle */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Drawer Position</FormLabel>
                {/* Drawer Position Toggle Icons */}
                {/* Drawer Position Toggle Icons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 20,
                    gap: "16px", // Increased gap between the buttons for better spacing
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <IconButton
                      onClick={toggleDrawerPosition}
                      sx={{
                        width: "120px",
                        height: "120px",
                        boxShadow: drawerPosition === "left" ? 3 : 0,

                        color:
                          drawerPosition === "left"
                            ? "primary.main"
                            : "grey.400",
                        border: "2px solid", // Add border
                        borderColor:
                          drawerPosition === "left"
                            ? "primary.main"
                            : "grey.400", // Dynamic border color
                        borderRadius: "8px", // Optional rounded corners
                        padding: "8px", // Increase padding
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.1)", // Subtle background on hover
                          borderColor: "primary.main", // Highlight border on hover
                        },
                      }}
                    >
                      <AlignHorizontalLeftIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ marginTop: "8px" }}>
                      Move Left
                    </Typography>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <IconButton
                      onClick={toggleDrawerPosition}
                      // color={drawerPosition === "right" ? "primary" : "black"}
                      sx={{
                        width: "120px",
                        height: "120px",
                        boxShadow: drawerPosition === "right" ? 3 : 0,
                        border: "2px solid", // Add border
                        color:
                          drawerPosition === "right"
                            ? "primary.main"
                            : "grey.400",
                        borderColor:
                          drawerPosition === "right"
                            ? "primary.main"
                            : "grey.400", // Dynamic border color
                        borderRadius: "8px", // Optional rounded corners
                        padding: "8px", // Increase padding
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.1)", // Subtle background on hover
                          borderColor: "primary.main", // Highlight border on hover
                        },
                      }}
                    >
                      <AlignHorizontalRightIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ marginTop: "8px" }}>
                      Move Right
                    </Typography>
                  </div>
                </div>
              </FormControl>
              {/* Color Options */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Primary Color</FormLabel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    marginTop: 20,
                  }}
                >
                  {[
                    { label: "Ocean", value: "ocean", color: "#00A76F" },
                    { label: "Blue", value: "blue", color: "#1b3c73" },
                    { label: "Violet", value: "violet", color: "#FF3030" },
                  ].map(({ label, value, color }) => (
                    <Stack
                      key={value}
                      onClick={() => changePrimaryColor(value)} // Pass the value
                      spacing={1} // Add spacing between the div and label
                      sx={{
                        cursor: "pointer",
                        alignItems: "center", // Center the div and label horizontally
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          backgroundColor: color,
                          borderRadius: 4,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                      >
                        {/* You can leave the content of the box empty if needed */}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: color === "#000000" ? "#fff" : "#000" }}
                      >
                        {label}
                      </Typography>
                    </Stack>
                  ))}
                </div>
              </FormControl>
            </div>
          </Drawer>
        </div>

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
