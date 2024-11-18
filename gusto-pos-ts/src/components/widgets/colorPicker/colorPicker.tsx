import { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

interface ColorProps {
  color: string;
  border: string;
}

interface ColorPickerProps {
  heading: string;
  colors: ColorProps[];
  onColorSelect?: (_color: string) => void;
}

const ColorPicker = ({ heading, colors, onColorSelect }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorset, setColorSet] = useState<ColorProps[]>([]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (onColorSelect) {
      onColorSelect(color);
    }
  };

  useEffect(() => {
    setColorSet(colors);
  }, [colors]);

  const handleAddColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    if (newColor) {
      const newColorObject: ColorProps = {
        color: newColor,
        border: 'transparent',
      };
      setColorSet([...colorset, newColorObject]);
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="subtitle1">{heading}</Typography>
      <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
        {colorset.map((singleColor) => (
          <IconButton
            key={singleColor.color}
            onClick={() => handleColorSelect(singleColor.color)}
            sx={{
              backgroundColor: singleColor.color,
              width: 40,
              height: 40,
              border: '1px solid',
              borderColor: singleColor.border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          >
            {selectedColor === singleColor.color && <DoneRoundedIcon />}
          </IconButton>
        ))}
        <IconButton
          sx={{
            backgroundColor: '#f0f0f0',
            width: 40,
            height: 40,
            border: '1px solid #DADADA',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <AddIcon />
          <input
            type="color"
            style={{
              position: 'absolute',
              cursor: 'pointer',
              padding: 0,
              width: 40,
              height: 40,
              opacity: 0,
            }}
            onChange={handleAddColor}
          />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ColorPicker;
