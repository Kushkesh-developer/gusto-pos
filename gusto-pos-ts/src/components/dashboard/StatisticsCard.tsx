import {
  alpha,
  Card,
  CardContent,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

export type IconProps = {
  sx: SxProps;
};

export type StatisticsData = {
  title: string;
  value: string;
  isPositive?: boolean;
  icon: (_props: IconProps) => React.ReactElement<SvgIconComponent>;
};

export function StatisticsCard({
  title,
  value,
  isPositive,
  icon,
}: StatisticsData) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        flex: 1,
        backgroundImage: `linear-gradient(to bottom right, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.dark, 0.4)})`,
      }}
    >
      <CardContent sx={{ position: "relative" }}>
        <Typography
          sx={{
            fontSize: 24,
            color: isPositive ? "green" : "red",
            fontWeight: "500",
          }}
          color="text.primary"
          textAlign={"center"}
        >
          {value}
        </Typography>
        <Typography
          sx={{ fontSize: 18 }}
          color="text.primary"
          textAlign={"center"}
        >
          {title}
        </Typography>
        {icon({
          sx: {
            color: "text.secondary",
            position: "absolute",
            left: 10,
            top: "0",
            opacity: { xs: 0.05, md: 0.15 },
            height: "100%",
            width: 60,
          },
        })}
      </CardContent>
    </Card>
  );
}
