import React from 'react';
import { Stack, StackProps } from '@mui/material';

interface GSCustomStackLayoutProps extends StackProps {
  withoutGrid?: boolean;
}

const GSCustomStackLayout = ({ withoutGrid, children, ...rest }: GSCustomStackLayoutProps) => {
  // You can customize the styles based on the withoutGrid prop if needed
  // You can customize the styles based on the withoutGrid prop if needed
  return (
    <Stack {...rest} spacing={withoutGrid ? 0 : rest.spacing}>
      {children}
    </Stack>
  );
};

export default GSCustomStackLayout;
