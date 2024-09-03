import { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

interface ColorProps {
  color: string;
  border: string;
}

interface ColorPickerProps {
  heading: string;
  colors: ColorProps[];
  onColorSelect?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  heading,
  colors,
  onColorSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (onColorSelect) {
      onColorSelect(color);
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="subtitle1">{heading}</Typography>
      <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
        {colors.map((singleColor) => (
          <IconButton
            key={singleColor.color}
            onClick={() => handleColorSelect(singleColor.color)}
            sx={{
              backgroundColor: singleColor.color,
              width: 40,
              height: 40,
              border: "1px solid",
              borderColor: singleColor.border,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            {selectedColor === singleColor.color && <DoneRoundedIcon />}
          </IconButton>
        ))}
        <IconButton
          sx={{
            backgroundColor: "#f0f0f0",
            width: 40,
            height: 40,
            border: "1px solid #DADADA",
            borderRadius: "10px",
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ColorPicker;
