"use client";
import { Box, Card, CardContent,  Paper,  Stack, Typography } from "@mui/material";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";
import PageHeader from "@/components/widgets/headers/PageHeader";
import { useLocalization } from "@/context/LocalizationProvider";

type StatisticsData = {
  title: string,
  value: string,
  isPositive?: boolean
}

function StatisticsCard({
  title,
  value, isPositive}: StatisticsData) {
  return (
    <Card variant="outlined" sx={{flex:1}} >
      <CardContent>
        <Typography sx={{ fontSize: 24, color:isPositive ? "green": "red", fontWeight:"500"}} color="text.primary" textAlign={"center"}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" textAlign={"center"}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

const statisticsData:StatisticsData[] = [
  {
    title: "Total sell",
    value: "$200.00",
  },
  {
    title: "Sale Number",
    value: "200.00"
  },
  {
    title: "Expenses",
    value: "$200.00"
  },
  {
    title: "Profit",
    value: "$200.00",
    isPositive: true
  },
  {
    title: "Online Sale",
    value: "$200.00"
  },
  {
    title: "Offline Sale",
    value: "$200.00"
  }
] 

export default function Home() {
  const { translate } = useLocalization()
  return (
    <Box sx={{flex:"1 1 auto", p:3}}>
      <PageHeader title="Dashboard"/>
      <Stack direction={"row"} sx={{justifyContent:"space-between"}} spacing={2}>
          {statisticsData.map((data, index) => (
            <StatisticsCard key={index} title={data.title} value={data.value} isPositive={data.isPositive}/>
          ))}
      </Stack>
      <Paper sx={{mt:2, p:2}}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography >Sales Breakdowns (By Hour)</Typography>
          <GSSelectInput options={["Today", "This Week", "This Month"]} value={"Today"} handleChange={() => {}}/>
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
