import React from "react";
import {
  Drawer,
  FormControl,
  FormLabel,
  IconButton,
  Typography,
  Stack,
  Box,
  useTheme,
} from "@mui/material";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import { getColorArray } from "@/theme/color-variants";
import { useDrawerContext } from "@/context/DrawerProvider";
import { useThemeContext } from "@/context/ThemeProvider";
import DisplayModeSwitch from "@/components/widgets/switch/DisplayModeSwitch";

interface SettingsDrawerProps {
  drawerOpen: boolean;
  toggleDrawer: (_open: boolean) => () => void;
  drawerPosition: string;
}

const SettingsDrawer = ({
  drawerOpen,
  toggleDrawer,
  drawerPosition,
}: SettingsDrawerProps) => {
  const theme = useTheme();
  const { toggleDrawerPosition } = useDrawerContext();
  const { changePrimaryColor } = useThemeContext();

  const colorPaletteArray = getColorArray();

  return (
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

        <FormControl component="fieldset">
          <FormLabel component="legend">Switch Theme</FormLabel>
          <DisplayModeSwitch />
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Drawer Position</FormLabel>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <IconButton
              onClick={toggleDrawerPosition}
              sx={{
                color: drawerPosition === "left" ? "primary.main" : "grey.400",
              }}
            >
              <AlignHorizontalLeftIcon />
            </IconButton>
            <IconButton
              onClick={toggleDrawerPosition}
              sx={{
                color: drawerPosition === "right" ? "primary.main" : "grey.400",
              }}
            >
              <AlignHorizontalRightIcon />
            </IconButton>
          </div>
        </FormControl>

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
            {colorPaletteArray.map(({ label, value, hex }) => (
              <Stack
                key={value}
                onClick={() => changePrimaryColor(value)}
                sx={{ cursor: "pointer", alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: hex,
                    borderRadius: 4,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: hex === "#000000" ? "#fff" : "#000" }}
                >
                  {label}
                </Typography>
              </Stack>
            ))}
          </div>
        </FormControl>
      </div>
    </Drawer>
  );
};

export default SettingsDrawer;
