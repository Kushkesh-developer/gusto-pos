
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import { useThemeContext } from '@/context/ThemeProvider';
// Ensure you're importing from Grid2









const DisplayModeButton = ({
  title,
  mode,
  icon: Icon,
  activeMode,
  onClick
}) =>
<Tooltip title={title}>
    <IconButton
    onClick={() => onClick(mode)}
    sx={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '8px',
      height: 70,
      color: activeMode === mode ? 'white' : 'gray',
      boxShadow: activeMode === mode ? 3 : 0,
      backgroundColor: activeMode === mode ? 'primary.main' : 'transparent',
      '&:hover': {
        backgroundColor: 'primary.light'
      }
    }}>

      <Icon />
      <Typography variant="body2" sx={{ marginTop: '8px' }}>
        {title}
      </Typography>
    </IconButton>
  </Tooltip>;


const DisplayModeSwitch = () => {
  const { themeMode, changeThemeManually } = useThemeContext();

  return (
    <Stack spacing={2} direction="row" mt={2} display={'flex'} flex={1}>
      <DisplayModeButton
        title="System"
        mode="system"
        icon={SettingsBrightnessIcon}
        activeMode={themeMode}
        onClick={changeThemeManually} />

      <DisplayModeButton
        title="Light"
        mode="light"
        icon={LightModeIcon}
        activeMode={themeMode}
        onClick={changeThemeManually} />

      <DisplayModeButton
        title="Dark"
        mode="dark"
        icon={DarkModeIcon}
        activeMode={themeMode}
        onClick={changeThemeManually} />

    </Stack>);

};

export default DisplayModeSwitch;