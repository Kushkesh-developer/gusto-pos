import { Divider, useTheme, Stack, SxProps, Typography } from "@mui/material";
import React from "react";

type PageHeaderProps = {
  title: string;
  hideSearch?: boolean;
  children?: React.ReactNode;
  handleSearchChanges?: () => void;
  sx?: SxProps;
};

export default function PageHeader(props: PageHeaderProps) {
  const theme = useTheme();
  return (
    <div>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color={theme.palette.primary.main} pb={2}>
          {props.title}
        </Typography>
        {props.children}
      </Stack>
      <Divider variant="fullWidth" sx={{ mb: 2 }} />
    </div>
  );
}
