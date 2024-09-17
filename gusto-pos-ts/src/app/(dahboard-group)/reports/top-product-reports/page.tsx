"use client";
import React from "react";
import { Typography, Divider, useTheme, Box } from "@mui/material";

const Page = () => {
    const theme = useTheme();

    return (
        <Box style={{ padding: "24px" }}>
            <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
              Top Product Reports
            </Typography>
            <Divider />
            <Box style={{marginTop:"15px"}}> 
              
            </Box>
        </Box>

    );
};

export default Page;

