"use client";
import React from "react";
import { Typography, Divider, useTheme } from "@mui/material";

const Page = () => {
    const theme = useTheme();

    return (
        <div style={{ padding: "24px" }}>
            <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
              Top Product Reports
            </Typography>
            <Divider />
            <div style={{marginTop:"15px"}}> 
              
            </div>
        </div>

    );
};

export default Page;

