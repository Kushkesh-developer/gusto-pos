import { useLocalization } from "@/context/LocalizationProvider";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export type ProductExpiry = {
  id?: number;
  product: string;
  location: string;
  expiry: string;
  quantity: string;
};

type ProductExpiryProps = {
  productExpiryData: ProductExpiry[];
  onPurchaseClicked?: () => void;
  onTransferClicked?: () => void;
};

function StockRow({

  product,
  location,
  expiry,
  quantity,
  isHeading,
}: ProductExpiry & { isHeading?: boolean }) {
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
      <Typography variant="body2" flex={1} sx={sx}>
        {quantity}
      </Typography>
      <Typography variant="body2" flex={1} textAlign={"end"} sx={sx}>
        {expiry}
      </Typography>
    </Stack>
  );
}

export function ProductExpiryAlert({
  productExpiryData = [],
}: ProductExpiryProps) {
  const { translate } = useLocalization();

  return (
    <Paper sx={{ mt: 2, p: 3, flex: 1, height: "fit-content" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography flex={1}>{translate("product_stock_alert")}</Typography>
        <Button variant="contained">{translate("purchase")}</Button>
      </Stack>
      <Divider variant="fullWidth" sx={{ my: 1 }} />
      <Stack sx={{ flex: 1, mt: 2 }}>
        <StockRow
        
          product={translate("product")}
          location={translate("location")}
          quantity={translate("current_stock")}
          expiry={translate("expiry")}
          isHeading
        />
        {productExpiryData.map(
          ({id, product, location, quantity, expiry }, index) => {
            return (
              <StockRow
                id={id}
                key={index}
                product={product}
                location={location}
                expiry={expiry}
                quantity={quantity}
              />
            );
          },
        )}
      </Stack>
    </Paper>
  );
}
