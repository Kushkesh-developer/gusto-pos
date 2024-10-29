import React from "react";
import {
  Drawer,
  FormControl,
  FormLabel,
  IconButton,
  Typography,
  Box,
  useTheme,
  Divider,
} from "@mui/material";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import { getColorArray } from "@/theme/color-variants";
import { useDrawerContext } from "@/context/DrawerProvider";
import { useThemeContext } from "@/context/ThemeProvider";
import DisplayModeSwitch from "@/components/widgets/switch/DisplayModeSwitch";
import { useLocalization } from "@/context/LocalizationProvider";

interface SettingsDrawerProps {
  drawerOpen: boolean;
  toggleDrawer: (_open: boolean) => void;
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
  const { translate } = useLocalization();

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
      onClose={() => toggleDrawer(false)}
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
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {translate("theme_settings")}
        </Typography>
        <Divider sx={{ ml: -2, mr: -2 }} />
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: "text.primary" }}>
            {translate("switch_theme")}
          </FormLabel>
          <DisplayModeSwitch />
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend" sx={{ color: "text.primary" }}>
            {translate("drawer_position")}
          </FormLabel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              mt: 2,
            }}
          >
            <IconButton
              onClick={toggleDrawerPosition}
              sx={{
                color: drawerPosition === "left" ? "primary.main" : "grey.400",
                padding: 4,
                borderRadius: 4,
                border: "1px solid",
              }}
            >
              <AlignHorizontalLeftIcon />
            </IconButton>
            <IconButton
              onClick={toggleDrawerPosition}
              sx={{
                color: drawerPosition === "right" ? "primary.main" : "grey.400",
                padding: 4,
                borderRadius: 4,
                border: "1px solid",
              }}
            >
              <AlignHorizontalRightIcon />
            </IconButton>
          </Box>
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend" sx={{ color: "text.primary" }}>
            {translate("primary_color")}
          </FormLabel>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              marginTop: 2,
            }}
          >
            {colorPaletteArray.map(({ label, value, hex }) => (
              <Box
                key={value}
                onClick={() => changePrimaryColor(value)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    backgroundColor: hex,
                    borderRadius: 3,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: hex === "#000000" ? "#fff" : "#000" }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </FormControl>
      </div>
    </Drawer>
  );
};

export default SettingsDrawer;
