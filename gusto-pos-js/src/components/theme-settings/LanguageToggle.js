import {
  Select,
  MenuItem,
  FormControl } from

"@mui/material";
import { styled } from "@mui/system";
import { useLocalization } from "@/context/LocalizationProvider";

// Define available languages with their corresponding flags
const languages = [
{ code: "en", label: "EN", flag: "🇬🇧" },
{ code: "es", label: "ES", flag: "🇪🇸" }
// { code: "fr", label: "FR", flag: "🇫🇷" },
// { code: "de", label: "DE", flag: "🇩🇪" },
// { code: "hi", label: "HI", flag: "🇮🇳" },
];

const LanguageSelect = styled(Select)({
  height: "40px",
  ".MuiOutlinedInput-input": {
    padding: "10px 14px"
  }
});





function LanguageDropdown({ sx }) {
  const { locale, setLocale } = useLocalization();

  const handleChange = (event) => {
    setLocale(event?.target?.value);
  };

  return (
    <FormControl variant="standard" sx={{ mr: 2, ...sx }}>
      {/* <InputLabel>Language</InputLabel> */}
      <LanguageSelect
        value={locale}
        onChange={handleChange}
        label="Language"
        sx={{
          color: "primary.main",
          "& .MuiSelect-iconStandard": {
            display: "none"
          },
          "& .MuiSelect-select": {
            paddingRight: "8px !important"
          }
        }}>

        {languages.map((language) =>
        <MenuItem key={language.code} value={language.code}>
            <span style={{ marginRight: 8, fontSize: 18 }}>
              {language.flag}
            </span>
            {language.label}
          </MenuItem>
        )}
      </LanguageSelect>
    </FormControl>);

}

export default LanguageDropdown;