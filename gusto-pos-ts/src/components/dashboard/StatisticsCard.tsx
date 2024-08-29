import { Card, CardContent, Typography } from "@mui/material";

export type StatisticsData = {
    title: string,
    value: string,
    isPositive?: boolean
  }
  
 export function StatisticsCard({
    title,
    value, isPositive }: StatisticsData) {
    return (
      <Card variant="outlined" sx={{ flex: 1 }} >
        <CardContent>
          <Typography sx={{ fontSize: 24, color: isPositive ? "green" : "red", fontWeight: "500" }} color="text.primary" textAlign={"center"}>
            {value}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.primary" textAlign={"center"}>
            {title}
          </Typography>
        </CardContent>
      </Card>
    );
  }