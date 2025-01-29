import { Card, CardContent, Typography, useTheme } from '@mui/material';













export function StatisticsCard({ title, value, isPositive, icon }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        flex: 1
      }}>

      <CardContent sx={{ position: 'relative' }}>
        <Typography
          sx={{
            fontSize: 24,
            color: isPositive ? 'green' : theme.palette.primary.main,
            fontWeight: '500'
          }}
          color="text.primary"
          textAlign={'center'}>

          {value}
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.primary" textAlign={'center'}>
          {title}
        </Typography>
        {icon({
          sx: {
            color: 'text.secondary',
            position: 'absolute',
            left: 10,
            top: '0',
            opacity: { xs: 0.05, md: 0.15 },
            height: '100%',
            width: 60
          }
        })}
      </CardContent>
    </Card>);

}