import {
  alpha,
  FormControl,
  MenuItem,
  Select,


  useTheme } from
"@mui/material";








function GSSelectInput({
  value,
  options,
  handleChange,
  sx = {}
}) {
  const theme = useTheme();
  return (
    <FormControl sx={{ minWidth: 140, mr: 4, p: 0.5 }} size="small">
      <Select
      // labelId="demo-simple-select-label"
      id={value}
      value={value}
      displayEmpty
      onChange={handleChange}
      sx={{
        fontSize: 14,
        height: 44,
        boxShadow: "1px 1px 2px 0px #0000001a",
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        borderRadius: theme.shape.borderRadius + "px",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          border: 0
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
        {
          border: 0
        },
        ...sx
      }}>

        {options.map((option) =>
        <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        )}
      </Select>
    </FormControl>);

}

export default GSSelectInput;