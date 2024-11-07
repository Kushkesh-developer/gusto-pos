import { Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";
import { useLocalization } from "@/context/LocalizationProvider";

// Styled switch component
const LanguageSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "primary.main",
      transform: "translateX(26px)",
      "& .MuiSwitch-thumb:before": {
        content: '"🇪🇸"',
      },
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    "&:before": {
      content: '"🇮🇳"',
      fontSize: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  "& .MuiSwitch-track": {
    color: "primary.main",
    borderRadius: 20 / 2,
    backgroundColor: theme.palette.mode === "dark" ? "#39393D" : "#E9E9EA",
    opacity: 1,
  },
}));

function LanguageToggle() {
  const { locale, setLocale } = useLocalization();
  const toggleLanguage = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  return (
    <FormControlLabel
      control={
        <LanguageSwitch checked={locale === "es"} onChange={toggleLanguage} />
      }
      label={locale === "en" ? "EN" : "ES"}
      sx={{
        color: "primary.main", // Set label color to primary.main
      }}
    />
  );
}

export default LanguageToggle;
