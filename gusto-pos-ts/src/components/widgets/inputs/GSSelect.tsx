import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type GSSelectInputProps = {
  value: string;
  options: string[];
  handleChange: () => void;
};

function GSSelectInput({ value, options, handleChange }: GSSelectInputProps) {
  return (
    <FormControl sx={{ minWidth: 140, mr: 4, p: 0.5 }} size="small">
      <Select
        // labelId="demo-simple-select-label"
        id={value}
        value={value}
        displayEmpty
        onChange={handleChange}
        // sx={{ fontSize: 14, height: 44}}
        sx={{
          fontSize: 14,
          height: 40,
          boxShadow: "1px 1px 2px 0px #0000001a",
          backgroundColor: "#1b3c731a",
          borderRadius: "4px",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: 0,
            },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  return (
    <FormControl sx={{ minWidth: 140, mr: 4, p: 0.5 }} size="small">
      <Select
        // labelId="demo-simple-select-label"
        id={value}
        value={value}
        displayEmpty
        onChange={handleChange}
        // sx={{ fontSize: 14, height: 44}}
        sx={{
          fontSize: 14,
          height: 40,
          boxShadow: "1px 1px 2px 0px #0000001a",
          backgroundColor: "#1b3c731a",
          borderRadius: "4px",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: 0,
            },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default GSSelectInput;
