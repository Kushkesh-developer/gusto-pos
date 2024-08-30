import { useLocalization } from "@/context/LocalizationProvider";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export function DashboardNote() {
    const { translate } = useLocalization()
    return (
        <Paper sx={{ p: 3, flex: 1, height: "fit-content" }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography >{translate("note")}</Typography>
                <Button variant="contained" disabled={true}>{translate("saved")}</Button>
            </Stack>
            <TextField
                fullWidth
                sx={{
                    mt: 2,
                    ".MuiInputBase-root textarea": {
                        height: "200px !important"
                    }
                }}
                placeholder="Type your note here"
                multiline
                rows={2}
                maxRows={10}
            />
            <Button sx={{ minWidth: 120, mt: 4 }} variant="contained">{translate("save")}</Button>
        </Paper>
    );
}