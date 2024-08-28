"use client";
import { Box, Card, CardContent,  Paper,  Stack, Typography } from "@mui/material";
import GSSelectInput from "@/components/widgets/inputs/GSSelect";
import PageHeader from "@/components/widgets/headers/PageHeader";


function StatisticsCard({
  title,
  value, isPositive}) {
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

const statisticsData = [
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
      </Paper>
    </Box>
  );
}
