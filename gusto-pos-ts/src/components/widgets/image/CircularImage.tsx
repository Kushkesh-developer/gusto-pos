import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
interface CircularImageProps {
  alt: string; // Alt text for the image
  size?: number; // Diameter of the circular image
  defaultSrc?: string; // Path to the default image
  priority?: boolean;
}

const CircularImage: React.FC<CircularImageProps> = ({
  alt,
  size = 100,
  defaultSrc,
}) => {
  const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result as string;
        setSelectedImg(imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImg(undefined); // Remove the image
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px', // Space between the image and the button
        position: 'relative', // Necessary for positioning the remove button
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          border: `2px dotted ${theme.palette.primary.main}`, // Dotted border
          padding: '7px', // Padding between the border and the image
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow
        }}
        onClick={() => fileInputRef.current?.click()} // Trigger file input when clicked
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        {selectedImg || defaultSrc ? (
          // Circular Image with padding and border-radius
          <Image
            src={selectedImg || defaultSrc}
            alt={alt}
            layout="fill"
            objectFit={selectedImg ? "cover" :"contain"}
            style={{
              borderRadius: '50%', // Make the image circular
              padding: '3px', // Padding between the image and the border
            }}
          />
        ) : (
          // Centered Alt Text
          <span
            style={{
              fontSize: size / 5, // Dynamically scale text size
              color: '#555',
              textAlign: 'center',
            }}
          >
            {alt}
          </span>
        )}
      </Box>

      {/* Remove Button */}
      <Button
        onClick={handleRemoveImage}
        sx={{
          minWidth: 'auto',
          padding: '4px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          color: theme.palette.error.main,
          fontSize: '1.2rem',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        Remove
      </Button>
    </Box>
  );
};

export default CircularImage;
