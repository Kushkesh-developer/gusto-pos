import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';









export default function PageHeader(props) {
  return (
    <div>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" color={'text.primary'} pb={2}>
          {props.title}
        </Typography>
        {props.children}
      </Stack>
      <Divider variant="fullWidth" sx={{ mb: 2 }} />
    </div>);

}