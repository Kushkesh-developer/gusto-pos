import { useLocalization } from "@/context/LocalizationProvider";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

type SalesReportProps = {
  title: string;
  price: string;
  quantity?: string;
};

export type SalesBreakdownsReportType = {
  title?: string;
  saleTitleHeading?: string;
  amountHeading?: string;
  quantityHeading?: string;
  items: {
    title: string;
    quantity?: string;
    price: string;
    lightAppearance?: boolean;
  }[];
};

function PriceDataLabels({ title, price, quantity }: SalesReportProps) {
  return (
    <Stack direction={"row"} alignItems={"center"} mt={1}>
      <Typography variant="body2">{title}</Typography>
      <Divider
        variant="middle"
        sx={{ borderStyle: "dashed", flex: 1, mx: 1 }}
      />
      {quantity && <Typography variant="body2">{quantity}</Typography>}
      {quantity && (
        <Divider variant="middle" sx={{ borderStyle: "dashed", width: 20 }} />
      )}
      <Typography variant="body2" sx={{ minWidth: 60 }} textAlign={"end"}>
        {price}
      </Typography>
    </Stack>
  );
}

export default function SalesReportBreakdown({
  stalesBreakDownReportData = [],
}: {
  stalesBreakDownReportData: SalesBreakdownsReportType[];
}) {
  const { translate } = useLocalization();
  return (
    <Paper sx={{ mt: 2, p: 2, flex: 1 }}>
      <Stack direction={"row"} mb={2} justifyContent={"space-between"}>
        <Typography>{translate("sales_breakdown_report")}</Typography>
        <Button variant="contained">Print</Button>
      </Stack>
      <Box
        flex={1}
        sx={{ p: 2, border: "1px solid #D9D9D9", borderRadius: "5px" }}
      >
        <Typography>Date: 28 Jan 2021 to 28 Jan 2021</Typography>
        <Divider sx={{ mt: 2 }} />
        {stalesBreakDownReportData.map((data, index) => {
          return (
            <Stack key={index} mt={3}>
              <Typography variant="body2" mb={1} color={"GrayText"}>
                {data.title}
              </Typography>
              <Stack key={data.title} direction={"row"} alignItems={"center"}>
                <Typography sx={{ flex: 1, fontWeight: "500" }}>
                  {data.saleTitleHeading}
                </Typography>
                {data.quantityHeading && (
                  <Typography sx={{ fontWeight: "500" }}>
                    {data.quantityHeading}
                  </Typography>
                )}
                {data.amountHeading && (
                  <Typography
                    sx={{ minWidth: 100, fontWeight: "500" }}
                    textAlign={"end"}
                  >
                    {data.amountHeading}
                  </Typography>
                )}
              </Stack>
              {data.items.map((item, index) => {
                return (
                  <PriceDataLabels
                    key={index}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                  />
                );
              })}
            </Stack>
          );
        })}
      </Box>
    </Paper>
  );
}
