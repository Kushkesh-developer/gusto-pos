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

  // Function to handle printing the report
  const printData = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      // Constructing the content for printing
      const reportContent = `
        <html>
          <head>
            <title>Sales Report</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              h1 {
                text-align: center;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
            </style>
          </head>
          <body>
            <h1>${translate("sales_breakdown_report")}</h1>
            <h3>Date: 28 Jan 2021 to 28 Jan 2021</h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${stalesBreakDownReportData
                  .map((data) =>
                    data.items
                      .map(
                        (item) => `
                          <tr>
                            <td>${item.title}</td>
                            <td>${item.quantity || "N/A"}</td>
                            <td>${item.price}</td>
                          </tr>
                        `,
                      )
                      .join(""),
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `;

      printWindow.document.write(reportContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Paper sx={{ mt: 2, p: 2, flex: 1 }}>
      <Stack direction={"row"} mb={2} justifyContent={"space-between"}>
        <Typography>{translate("sales_breakdown_report")}</Typography>
        <Button variant="contained" onClick={printData}>
          Print
        </Button>
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
