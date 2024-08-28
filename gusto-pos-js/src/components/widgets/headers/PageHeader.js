import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";

export default function PageHeader(props) {
    return (
        <div>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                <Typography variant="h5" color={"primary"} pb={2}>{props.title}</Typography>
                {props.hideSearch ? null : <GSSearchField placeHolder="Search..." onChange={props?.handleSearchChanges}/>}
                {props.children}
            </Stack>
            <Divider variant="fullWidth" sx={{ mb: 2 }} />
        </div>
    )
}