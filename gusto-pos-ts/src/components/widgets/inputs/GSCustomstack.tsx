import React from 'react';
import { Stack, StackProps } from '@mui/material';

interface GSCustomStackProps extends StackProps {
  withoutGrid?: boolean;
}

const GSCustomStack = ({ withoutGrid, children, ...rest }: GSCustomStackProps) => {
  // You can customize the styles based on the withoutGrid prop if needed
  return (
    <Stack {...rest} spacing={withoutGrid ? 0 : rest.spacing}>
      {children}
    </Stack>
  );
};

export default GSCustomStack;
