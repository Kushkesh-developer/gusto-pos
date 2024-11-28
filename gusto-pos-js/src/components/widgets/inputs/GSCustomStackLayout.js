import React from 'react';
import { Stack } from '@mui/material';





const GSCustomStackLayout = ({ withoutGrid, children, ...rest }) => {
  // You can customize the styles based on the withoutGrid prop if needed
  // You can customize the styles based on the withoutGrid prop if needed
  return (
    <Stack {...rest} spacing={withoutGrid ? 0 : rest.spacing}>
      {children}
    </Stack>);

};

export default GSCustomStackLayout;