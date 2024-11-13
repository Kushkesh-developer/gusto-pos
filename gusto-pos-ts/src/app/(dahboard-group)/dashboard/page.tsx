"use client";
import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import PageHeader from "@/components/widgets/headers/PageHeader";
import {
  hours,
  daysOfWeek,
  datesOfMonth,
  productExpiryData,
  productStockData,
  stalesBreakDownReportData,
  statisticsData,
} from "@/mock/dashboard"; // Update to include daysOfWeek and datesOfMonth
import { LineChart } from "@mui/x-charts";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { useLocalization } from "@/context/LocalizationProvider";
import SalesReportBreakdown from "@/components/dashboard/SalesReportBreakdown";
import { DashboardNote } from "@/components/dashboard/DashboardNote";
import { ProductStockAlert } from "@/components/dashboard/ProductStock";
import { ProductExpiryAlert } from "@/components/dashboard/ProductExpiry";
import Grid from "@mui/material/Grid2";

// Sample data for different time ranges
const salesData = {
  today: [
    2, 3, 3.5, 4.5, 2.5, 5, 1, 4, 3, 8, 9, 10, 2, 3, 3.5, 4.5, 2.5, 5, 1, 4, 3,
    8, 9, 10,
  ],
  week: [10, 20, 15, 25, 18, 30, 22],
  month: [5, 8, 12, 18, 25, 28, 35, 38, 40, 45, 50, 60, 55, 65, 70],
};

// Define arrays for x-axis labels
const xAxisData = {
  today: hours, // Assume hours is an array like ['12am', '1am', ... '11pm']
  week: daysOfWeek, // daysOfWeek = ['Mon', 'Tue', 'Wed', ... 'Sun']
  month: datesOfMonth, // datesOfMonth = [1, 2, 3, ... 31] (or fewer days based on month)
};

export default function Home() {
  const { translate } = useLocalization();
  const [selectedRange, setSelectedRange] = useState("Today");

  const theme = useTheme();
  // Get chart data and x-axis data based on selection
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

  const getXAxisData = () => {
    switch (selectedRange) {
      case "Today":
        return xAxisData.today;
      case "This Week":
        return xAxisData.week;
      case "This Month":
        return xAxisData.month;
      default:
        return xAxisData.today;
    }
  };
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title={translate("dashboard")} />
      <Grid container spacing={2} mt={2}>
        {statisticsData.map((stat, index) => (
          <Grid size={{ xs: 6, md: 6, lg: 3 }} key={stat.id}>
            <StatisticsCard
              key={index}
              title={stat.title}
              value={stat.value}
              isPositive={stat.isPositive}
              icon={stat.icon}
            />
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 2, p: 2 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>{translate("sales_breakdowns")}</Typography>
          <SelectInput
            variant="gs" // Sets the GS styling
            options={["Today", "This Week", "This Month"]}
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)} // Use onChange instead of handleChange
          />
        </Stack>
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: getXAxisData(),
            },
          ]}
          series={[
            {
              data: getChartData(),
              color: theme.palette.primary.main,
            },
          ]}
          height={400}
        />
      </Paper>

      <Stack spacing={2} mt={2} direction={{ xs: "column", sm: "row" }}>
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
