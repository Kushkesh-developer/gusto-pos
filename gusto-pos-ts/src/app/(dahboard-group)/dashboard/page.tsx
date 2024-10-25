"use client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";
import PageHeader from "@/components/widgets/headers/PageHeader";
import {
  hours,
  productExpiryData,
  productStockData,
  stalesBreakDownReportData,
  statisticsData,
} from "@/mock/dashboard";
import { LineChart } from "@mui/x-charts";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { useLocalization } from "@/context/LocalizationProvider";
import SalesReportBreakdown from "@/components/dashboard/SalesReportBreakdown";
import { DashboardNote } from "@/components/dashboard/DashboardNote";
import { ProductStockAlert } from "@/components/dashboard/ProductStock";
import { ProductExpiryAlert } from "@/components/dashboard/ProductExpiry";

// Sample data for different time ranges
const salesData = {
  today: [
    2, 3, 3.5, 4.5, 2.5, 5, 1, 4, 3, 8, 9, 10, 2, 3, 3.5, 4.5, 2.5, 5, 1, 4, 3,
    8, 9, 10,
  ],
  week: [10, 20, 15, 25, 18, 30, 22],
  month: [5, 8, 12, 18, 25, 28, 35, 38, 40, 45, 50, 60, 55, 65, 70],
};

export default function Home() {
  const { translate } = useLocalization();
  const [selectedRange, setSelectedRange] = useState("Today");

  // Update chart data based on selection
  const getChartData = () => {
    switch (selectedRange) {
      case "Today":
        return salesData.today;
      case "This Week":
        return salesData.week;
      case "This Month":
        return salesData.month;
      default:
        return salesData.today;
    }
  };

  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("dashboard")} />
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between" }}
        spacing={2}
      >
        {statisticsData.map((data, index) => (
          <StatisticsCard
            key={index}
            title={data.title}
            value={data.value}
            isPositive={data.isPositive}
          />
        ))}
      </Stack>

      <Paper sx={{ mt: 2, p: 2 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>{translate("sales_breakdowns")}</Typography>
          <GSSelectInput
            options={["Today", "This Week", "This Month"]}
            value={selectedRange}
            handleChange={(e) => setSelectedRange(e.target.value)} // Update selection
          />
        </Stack>
        <LineChart
          xAxis={[{ scaleType: "point", data: hours }]}
          series={[
            {
              data: getChartData(), // Use dynamic chart data based on selection
            },
          ]}
          height={400}
        />
      </Paper>

      <Stack
        direction={"row"}
        spacing={2}
        mt={2}
        sx={{
          flexDirection: {
            sm: "row", // Column direction on extra-small screens (mobile)
            xs: "column", // Row direction on small screens (tablets) and up
          },
        }}
      >
        <SalesReportBreakdown
          stalesBreakDownReportData={stalesBreakDownReportData}
        />
        <Stack flex={1} sx={{ height: "fit-content" }}>
          <DashboardNote />
          <ProductStockAlert productStockData={productStockData} />
          <ProductExpiryAlert productExpiryData={productExpiryData} />
        </Stack>
      </Stack>
    </Box>
  );
}
