import { useLocalization } from "@/context/LocalizationProvider";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export type ProductStock = {
  id?: number;
  product: string;
  location: string;
  quantity: string;
};

type ProductStockProps = {
  productStockData: ProductStock[];
  onPurchaseClicked?: () => void;
  onTransferClicked?: () => void;
};

function StockRow({
  product,
  location,
  quantity,
  isHeading,
}: ProductStock & { isHeading?: boolean }) {
  const sx = isHeading
    ? { fontWeight: "500", color: "text.secondary", fontSize: 16 }
    : {};
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      mt={1}
      flex={1}
      mb={isHeading ? 1 : 0}
    >
      <Typography variant="body2" flex={1} sx={sx}>
        {product}
      </Typography>
      <Typography variant="body2" flex={1} sx={sx}>
        {location}
      </Typography>
      <Typography variant="body2" flex={1} textAlign={"end"} sx={sx}>
        {quantity}
      </Typography>
    </Stack>
  );
}

export function ProductStockAlert({ productStockData }: ProductStockProps) {
  const { translate } = useLocalization();

  return (
    <Paper sx={{ mt: 2, p: 3, flex: 1, height: "fit-content" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography flex={1}>{translate("product_stock_alert")}</Typography>
        <Button sx={{ mr: 2 }} variant="contained">
          {translate("purchase")}
        </Button>
        <Button variant="contained">{translate("transfer")}</Button>
      </Stack>
      <Divider variant="fullWidth" sx={{ my: 1 }} />
      <Stack sx={{ flex: 1, mt: 1 }}>
        <StockRow
          product={translate("product")}
          location={translate("location")}
          quantity={translate("quantity")}
          isHeading
        />
        {productStockData.map(({ id, product, location, quantity }, index) => {
          return (
            <StockRow
              id={id}
              key={index}
              product={product}
              location={location}
              quantity={quantity}
            />
          );
        })}
      </Stack>
    </Paper>
  );
}
