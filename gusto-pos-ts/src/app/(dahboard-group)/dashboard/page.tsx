"use client";
import { Box, Paper, Stack, Typography, Grid, TextField } from "@mui/material";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { hours, productExpiryData, productStockData, stalesBreakDownReportData, statisticsData } from "@/mock/dashboard";
import { LineChart } from "@mui/x-charts";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { useLocalization } from "@/context/LocalizationProvider";
import SalesReportBreakdown from "@/components/dashboard/SalesReportBreakdown";
import { DashboardNote } from "@/components/dashboard/DashboardNote";
import { ProductStockAlert } from "@/components/dashboard/ProductStock";
import { ProductExpiryAlert } from "@/components/dashboard/ProductExpiry";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Grid from "@mui/material/Unstable_Grid2/Grid2";


export default function Home() {
  const { translate } = useLocalization()
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title="Dashboard"/>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }} spacing={2}>
        {statisticsData.map((data, index) => (
          <StatisticsCard key={index} title={data.title} value={data.value} isPositive={data.isPositive} />
        ))}
      </Stack>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography >{translate("sales_breakdowns")}{" "}
          </Typography>
          <GSSelectInput options={["Today", "This Week", "This Month"]} value={"Today"} handleChange={() => { }} />
        </Stack>
        <LineChart
          xAxis={[{ scaleType: 'point', data: hours }]}
          series={[
            {
              data: [2, 3, 3.5, 4.5, 2.5, 5, 1, 4, 3, 8, 9, 10, 2, 3, 3.5, 4.5, 2.5, 5, 1, 4, 3, 8, 9, 10],
            },
          ]}
          height={400}
        />
      </Paper>

      <Stack direction={"row"} spacing={2} mt={2} sx={{
        flexDirection: {
          sm: 'row',  // Column direction on extra-small screens (mobile)
          xs: 'column',     // Row direction on small screens (tablets) and up
        },
      }}>
        <SalesReportBreakdown stalesBreakDownReportData={stalesBreakDownReportData} />
        <Stack flex={1} sx={{ height: "fit-content" }}>
          <DashboardNote />
          <ProductStockAlert productStockData={productStockData} />
          <ProductExpiryAlert productExpiryData={productExpiryData} />
        </Stack>
      </Stack>
    </Box>
  );
}
