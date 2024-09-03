import { Divider, Stack, SxProps, Typography } from "@mui/material";
import React from "react";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";

type PageHeaderProps = {
  title: string;
  hideSearch?: boolean;
  children?: React.ReactNode;
  handleSearchChanges?: (value: string) => void;
  sx?: SxProps
};

export default function PageHeader(props: PageHeaderProps) {
  return (
    <div>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color={"text.primary"} pb={2}>
          {props.title}
        </Typography>
        {props.children}
      </Stack>
      <Divider variant="fullWidth" sx={{ mb: 2 }} />
    </div>
  );
}
