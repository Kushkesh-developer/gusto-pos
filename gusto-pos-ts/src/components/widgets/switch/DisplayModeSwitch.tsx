import { IconButton, Tooltip, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { useThemeContext } from "@/context/ThemeProvider";
import Grid from "@mui/material/Grid2"; // Ensure you're importing from Grid2

const DisplayModeSwitch = () => {
  const { themeMode, changeThemeManually } = useThemeContext();

  return (
    <Grid container spacing={2} mt={2}>
      {/* System Default Theme */}
      <Grid>
        <Tooltip title="System Default">
          <IconButton
            onClick={() => changeThemeManually("system")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: themeMode === "system" ? "2px solid" : "1px solid grey",
              borderRadius: "8px",
              width: "120px",
              height: "120px",
              boxShadow: themeMode === "system" ? 3 : 0,
              backgroundColor: themeMode === "system" ? "primary.main" : "gray",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <SettingsBrightnessIcon />
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              System Preference
            </Typography>
          </IconButton>
        </Tooltip>
      </Grid>

      {/* Light Theme */}
      <Grid>
        <Tooltip title="Light Mode">
          <IconButton
            onClick={() => changeThemeManually("light")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: themeMode === "light" ? "2px solid" : "1px solid grey",
              borderRadius: "8px",
              width: "120px",
              height: "120px",
              boxShadow: themeMode === "light" ? 3 : 0,
              backgroundColor: themeMode === "light" ? "primary.main" : "gray",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <LightModeIcon />
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              Light Mode
            </Typography>
          </IconButton>
        </Tooltip>
      </Grid>

      {/* Dark Theme */}
      <Grid>
        <Tooltip title="Dark Mode">
          <IconButton
            onClick={() => changeThemeManually("dark")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: themeMode === "dark" ? "2px solid" : "1px solid grey",
              borderRadius: "8px",
              width: "120px",
              height: "120px",
              boxShadow: themeMode === "dark" ? 3 : 0,
              backgroundColor: themeMode === "dark" ? "primary.main" : "gray",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <DarkModeIcon />
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              Dark Mode
            </Typography>
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default DisplayModeSwitch;
