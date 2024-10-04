import React from "react";
import { Stack, StackProps } from "@mui/material";

interface CustomStackProps extends StackProps {
  withoutGrid?: boolean;
}

const CustomStack = ({
  withoutGrid,
  children,
  ...rest
}:CustomStackProps) => {
  // You can customize the styles based on the withoutGrid prop if needed
  return (
    <Stack {...rest} spacing={withoutGrid ? 0 : rest.spacing}>
      {children}
    </Stack>
  );
};

export default CustomStack;
