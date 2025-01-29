import { useLocalization } from '@/context/LocalizationProvider';
import { Typography } from '@mui/material';
import React from 'react';
export default function CopyrightFooter({ sx = {} }) {
  const { translate } = useLocalization();
  return (
    <Typography
      fontSize={12}
      textAlign={'center'}
      sx={{
        mt: 1,
        p: 1,
        ...sx
      }}
      color={'text.secondary'}>

      {translate('copyright_text')}
    </Typography>);

}