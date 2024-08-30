import { useLocalization } from "@/context/LocalizationProvider";
import { productStockData } from "@/mock/dashboard";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";


export type ProductStock = {
    product: string
    location: string
    quantity: string
}

type ProductStockProps = {
    productStock: ProductStock[]
    onPurchaseClicked?: () => void,
    onTransferClicked?: () => void
}

export function ProductStock(props: ProductStockProps) {
    const { translate } = useLocalization()

    return (
        <Paper sx={{ mt: 2, p: 3, flex: 1, height: "fit-content" }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography flex={1}>{translate("note")}</Typography>
                <Button sx={{mr: 2}} variant="contained" disabled={true}>{translate("purchase")}</Button>
                <Button variant="contained" disabled={true}>{translate("transfer")}</Button>
            </Stack>
            {/* {productStockData.map(({ title, quantity, price }) => {
                return (<Stack direction={"row"} alignItems={"center"} mt={1}>
                    <Typography variant="body2">{title}</Typography>
                    <Divider variant="middle" sx={{ borderStyle: 'dashed', flex: 1, mx: 1 }} />
                    {quantity && <Typography variant="body2">{quantity}</Typography>}
                    {quantity && <Divider variant="middle" sx={{ borderStyle: 'dashed', width: 20 }} />}
                    <Typography variant="body2" sx={{ minWidth: 60 }} textAlign={"end"}>{price}</Typography>
                </Stack>)
            }
            )} */}
            <Button sx={{ minWidth: 120, mt: 4 }} variant="contained">{translate("save")}</Button>
        </Paper>
    );
} 
