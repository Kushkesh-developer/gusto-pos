import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { styled, SxProps } from "@mui/system";
import { useLocalization } from "@/context/LocalizationProvider";
import Spain from "@/public/spain.svg";
import BritainFlag from "@/public/britain.svg";

// Define available languages with their corresponding flags
const languages = [
  {
    code: "en",
    label: "EN",
    flag: <BritainFlag />,
  },
  { code: "es", label: "ES", flag: <Spain /> },
  // Additional languages can be added here
];

const LanguageSelect = styled(Select)({
  height: "40px",
  ".MuiOutlinedInput-input": {
    padding: "10px 14px",
  },
});

type Props = {
  sx?: SxProps;
};

function LanguageDropdown({ sx }: Props) {
  const { locale, setLocale } = useLocalization();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setLocale(event?.target?.value as string);
  };

  return (
    <FormControl variant="standard" sx={{ mr: 2, ...sx }}>
      <LanguageSelect
        value={locale}
        onChange={handleChange}
        label="Language"
        sx={{
          color: "primary.main",
          "& .MuiSelect-iconStandard": {
            display: "none",
          },
          "& .MuiSelect-select": {
            paddingRight: "8px !important",
          },
          " & .css-1jvh8yl-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1jvh8yl-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1jvh8yl-MuiSelect-select-MuiInputBase-input-MuiInput-input":
            {
              display: "flex",
              alignItems: "center",
            },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            value={language.code}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ marginRight: 8, fontSize: 18, paddingTop: "5px" }}>
              {language.flag}
            </span>
            {language.label}
          </MenuItem>
        ))}
      </LanguageSelect>
    </FormControl>
  );
}

export default LanguageDropdown;
