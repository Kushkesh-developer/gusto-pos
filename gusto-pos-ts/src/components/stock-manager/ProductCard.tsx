import { Stack, Typography, Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ClickableCard from '@/components/widgets/cards/ClickableCard';

interface CardButtonData {
  image: string;
  title: string;
  price: number;
  onClick: () => void;
  badge?: number;
}

export default function ProductCard(props: CardButtonData) {
  return (
    <ClickableCard
      sx={{ width: '100%', p: 0, position: 'relative' }}
      onClick={() => props.onClick()}
      variant="outlined"
    >
      {props.badge && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            zIndex: 1,
          }}
        >
          {props.badge}
        </Box>
      )}
      <Image
        style={{ width: '100%', objectFit: 'cover', minHeight: 180 }}
        src={props.image}
        width={100}
        height={180}
        alt="product"
      />
      <Stack alignItems={'flex-start'} mx={1}>
        <Typography variant="body2">{props.title}</Typography>
        <Typography mt={2} mb={1}>
          L£{props.price}
        </Typography>
      </Stack>
    </ClickableCard>
  );
}
