import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';








const ProfileImage = ({ alt, size = 100, defaultSrc }) => {
  const [selectedImg, setSelectedImg] = useState(undefined);
  const fileInputRef = useRef(null);
  const theme = useTheme();

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

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setSelectedImg(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box
      sx={{
        position: 'relative', // Added to ensure proper positioning context
        width: 'fit-content' // Added to contain the component
      }}>

      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'visible', // Changed to visible to show close icon
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          border: `2px dotted ${theme.palette.primary.main}`,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        onClick={() => fileInputRef.current?.click()}>

        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative'
          }}>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload} />


          {selectedImg || defaultSrc ?
          <Image
            src={selectedImg || defaultSrc || '/placeholderImage.svg'}
            alt={alt}
            layout="fill"
            objectFit={selectedImg ? 'cover' : 'contain'}
            style={{
              borderRadius: '50%'
            }} /> :


          <span
            style={{
              fontSize: size / 5,
              color: '#555',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}>

              {alt}
            </span>
          }
        </Box>

        {/* Close Icon - Moved outside overflow but inside clickable area */}
        {selectedImg &&
        <Box
          sx={{
            position: 'absolute',
            top: -6,
            right: -6,
            zIndex: 10,
            cursor: 'pointer',
            backgroundColor: 'white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ddd',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
          onClick={handleRemoveImage}>

            <CloseIcon
            sx={{
              color: 'red',
              fontSize: 14,
              pointerEvents: 'none' // Prevents icon from interfering with click
            }} />

          </Box>
        }
      </Box>
    </Box>);

};

export default ProfileImage;