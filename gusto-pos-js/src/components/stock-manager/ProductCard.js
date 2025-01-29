import { Stack, Typography, Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ClickableCard from '@/components/widgets/cards/ClickableCard';









export default function ProductCard(props) {
  const formatBadge = (value) => {
    return value.toLocaleString();
  };

  const getBadgeStyles = (value) => {
    // Calculate approximate width based on number of digits
    const numDigits = value.toString().length;
    const baseWidth = 24; // minimum width for single digit
    const digitWidth = 8; // approximate width per digit
    const calculatedWidth = baseWidth + (numDigits - 1) * digitWidth;

    return {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'primary.main',
      color: 'white',
      borderRadius: '12px',
      minWidth: `${calculatedWidth}px`,
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      padding: '0 8px',
      zIndex: 1
    };
  };

  return (
    <ClickableCard
      sx={{ width: '100%', p: 0, position: 'relative' }}
      onClick={() => props.onClick()}
      variant="outlined">

      {props.badge &&
      <Box sx={getBadgeStyles(props.badge)}>
          <Typography
          variant="caption"
          sx={{
            lineHeight: 1,
            whiteSpace: 'nowrap',
            fontWeight: 'medium',
            fontSize: 'inherit'
          }}>

            {formatBadge(props.badge)}
          </Typography>
        </Box>
      }
      <Image
        style={{ width: '100%', objectFit: 'cover', minHeight: 180 }}
        src={props.image}
        width={100}
        height={180}
        alt="product" />

      <Stack alignItems={'flex-start'} mx={1}>
        <Typography variant="body2">{props.title}</Typography>
        <Typography mt={2} mb={1}>
          ${props.price}
        </Typography>
      </Stack>
    </ClickableCard>);

}