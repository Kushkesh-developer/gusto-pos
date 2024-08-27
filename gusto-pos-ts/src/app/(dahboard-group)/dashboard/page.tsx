"use client";
import { alpha, Box, Divider, FormControl, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import GSSearchField from "@/app/_components/GSSearchField";

export default function Home() {
  return (
    <Box sx={{flex:"1 1 auto", p:3}}>
      <Stack direction={"row"} sx={{justifyContent:"space-between"}}>
        <Typography variant="h4" color={"primary"} pb={2}>Dashboard</Typography>
        <GSSearchField />
      </Stack>
      <Divider variant="fullWidth"/>
    </Box>
  );
}
