import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocalization } from '@/context/LocalizationProvider';







const ProfileImage = ({ alt, size = 100, defaultSrc }) => {
  const [selectedImg, setSelectedImg] = useState(undefined);
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const { translate } = useLocalization();
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
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
        position: 'relative' // Necessary for positioning the remove button
      }}>

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
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Optional shadow
        }}
        onClick={() => fileInputRef.current?.click()} // Trigger file input when clicked
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageUpload} />

        {selectedImg || defaultSrc ?
        <Image
          src={selectedImg || defaultSrc || '/placeholder.png'}
          alt={alt}
          layout="fill"
          objectFit={selectedImg ? 'cover' : 'contain'}
          style={{
            borderRadius: '50%', // Make the image circular
            padding: '3px'
          }} /> :


        <span
          style={{
            fontSize: size / 5, // Dynamically scale text size
            color: '#555',
            textAlign: 'center'
          }}>

            {alt}
          </span>
        }
      </Box>

      {/* Remove Button */}
      <Button
        onClick={handleRemoveImage}
        sx={{
          minWidth: 'auto',
          padding: '4px',
          borderRadius: '10%',
          backgroundColor: 'transparent',
          fontSize: '1.2rem',
          '&:hover': {
            backgroundColor: theme.palette.action.hover // Use hover color from theme
          }
        }}>

        <Box
          component="span"
          sx={{
            fontSize: 'inherit'
          }}>

          <Typography
            component="span"
            sx={{
              color: theme.palette.text.primary, // Use theme text color
              fontSize: 'inherit'
            }}>

            {translate('remove')}
          </Typography>
        </Box>
      </Button>
    </Box>);

};

export default ProfileImage;