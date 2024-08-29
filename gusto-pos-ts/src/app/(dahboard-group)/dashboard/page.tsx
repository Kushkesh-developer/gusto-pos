"use client";
import { Box, Button, Card, CardContent, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { stalesBreakDownReportData, statisticsData } from "@/mock/dashboard";
import { LineChart } from "@mui/x-charts";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { useLocalization } from "@/context/LocalizationProvider";
import SalesReportBreakdown from "@/components/dashboard/SalesReportBreakdown";

export type SalesBreakdownsReportType = {
  title?: string,
  saleTitleHeading?: string,
  amountHeading?: string,
  quantityHeading?: string,
  items: {
    title: string,
    quantity?: string,
    price: string,
    lightAppearance?: boolean
  }[]
}

const hours: string[] = [
  "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

export default function Home() {
  const { translate } = useLocalization()
  return (
    <Box sx={{ flex: "1 1 auto", p: 3 }}>
      <PageHeader title="Dashboard" />
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }} spacing={2}>
        {statisticsData.map((data, index) => (
          <StatisticsCard key={index} title={data.title} value={data.value} isPositive={data.isPositive} />
        ))}
      </Stack>

      <Paper sx={{ mt: 2, p: 2, flex: 1 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography >{translate("sales_breakdowns")}{" "}
            <Typography display="inline" color={"GrayText"}>
              ({translate("by_hour")})
            </Typography></Typography>
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

      <Stack direction={"row"} spacing={2} mt={2} >
        <SalesReportBreakdown stalesBreakDownReportData={stalesBreakDownReportData} />
        <Paper sx={{ mt: 2, p: 3, flex: 1, height:"fit-content"}}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography >{translate("note")}</Typography>
            <Button variant="contained" disabled={true}>{translate("saved")}</Button>
          </Stack>
          <TextField
            fullWidth
            sx={{
              mt: 2,
              ".MuiInputBase-root textarea": {
                height:"200px !important"
              }
            }}
            placeholder="Type your note here"
            multiline
            rows={2}
            maxRows={10}
          />
          <Button sx={{minWidth: 120, mt:4}} variant="contained">{translate("save")}</Button>
        </Paper>
      </Stack>



    </Box>
  );
}
