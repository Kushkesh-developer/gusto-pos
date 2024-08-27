"use client";
import { Box, Divider,  Stack, Typography } from "@mui/material";
import GSSearchField from "@/components/widgets/GSSearchField";

export default function Home() {
  return (
    <Box sx={{flex:"1 1 auto", p:3}}>
      <Stack direction={"row"} sx={{justifyContent:"space-between"}}>
        <Typography variant="h5" color={"primary"} pb={2}>Dashboard</Typography>
        <GSSearchField placeHolder="Search..."/>
      </Stack>
      <Divider variant="fullWidth"/>
    </Box>
  );
}
