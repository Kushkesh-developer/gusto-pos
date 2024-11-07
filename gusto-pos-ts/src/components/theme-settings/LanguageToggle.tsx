import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocalization } from "@/context/LocalizationProvider";

// Define available languages with their corresponding flags
const languages = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  // { code: "fr", label: "FR", flag: "🇫🇷" },
  // { code: "de", label: "DE", flag: "🇩🇪" },
  // { code: "hi", label: "HI", flag: "🇮🇳" },
];

const LanguageSelect = styled(Select)({
  height: "40px",
  ".MuiOutlinedInput-input": {
    padding: "10px 14px",
  },
});

function LanguageDropdown() {
  const { locale, setLocale } = useLocalization();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLocale(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2 }}>
      <InputLabel>Language</InputLabel>
      <LanguageSelect
        value={locale}
        onChange={handleChange}
        label="Language"
        sx={{
          color: "primary.main",
        }}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            <span style={{ marginRight: 8 }}>{language.flag}</span>
            {language.label}
          </MenuItem>
        ))}
      </LanguageSelect>
    </FormControl>
  );
}

export default LanguageDropdown;
