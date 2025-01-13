'use client';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import PageHeader from '@/components/widgets/headers/PageHeader';
import {
  hours,
  daysOfWeek,
  datesOfMonth,
  productExpiryData,
  productStockData,
  stalesBreakDownReportData } from
'@/mock/dashboard'; // Update to include daysOfWeek and datesOfMonth
import { LineChart } from '@mui/x-charts';
import { getStatisticsData } from '@/mock/dashboard';
import { StatisticsCard } from '@/components/dashboard/StatisticsCard';
import { useLocalization } from '@/context/LocalizationProvider';
import SalesReportBreakdown from '@/components/dashboard/SalesReportBreakdown';
import { DashboardNote } from '@/components/dashboard/DashboardNote';
import { ProductStockAlert } from '@/components/dashboard/ProductStock';
import { ProductExpiryAlert } from '@/components/dashboard/ProductExpiry';
import Grid from '@mui/material/Grid2';

// Sample data for different time ranges
const salesData = {
  today: [2, 3, 3.5, 4.5, 2.5, 5, 1, 4, 3, 8, 9, 10, 2, 3, 3.5, 4.5, 2.5, 5, 1, 4, 3, 8, 9, 10],
  week: [10, 20, 15, 25, 18, 30, 22],
  month: [5, 8, 12, 18, 25, 28, 35, 38, 40, 45, 50, 60, 55, 65, 70]
};

// Define arrays for x-axis labels
const xAxisData = {
  today: hours, // Assume hours is an array like ['12am', '1am', ... '11pm']
  week: daysOfWeek, // daysOfWeek = ['Mon', 'Tue', 'Wed', ... 'Sun']
  month: datesOfMonth // datesOfMonth = [1, 2, 3, ... 31] (or fewer days based on month)
};

export default function Home() {
  const { translate, locale } = useLocalization(); // Include locale to track the current language
  const [selectedRange, setSelectedRange] = useState('today');
  const statisticsData = getStatisticsData(translate);
  const theme = useTheme();

  // Get chart data and x-axis data based on selection
  const getChartData = () => {
    switch (selectedRange) {
      case 'today':
        return salesData.today;
      case 'week':
        return salesData.week;
      case 'month':
        return salesData.month;
      default:
        return salesData.today;
    }
  };

  const getXAxisData = () => {
    switch (selectedRange) {
      case 'today':
        return xAxisData.today;
      case 'week':
        return xAxisData.week;
      case 'month':
        return xAxisData.month;
      default:
        return xAxisData.today;
    }
  };

  // Handle language change effect on selectedRange
  useEffect(() => {
    // Reset selected range based on current language
    if (locale === 'es' && selectedRange === 'today') {
      setSelectedRange('hoy');
    } else if (locale === 'en' && selectedRange === 'hoy') {
      setSelectedRange('today');
    }
  }, [locale]);

  // Translate the selected range values dynamically
  const rangeOptions = [
  { value: 'today', label: translate('today') },
  { value: 'week', label: translate('this_week') },
  { value: 'month', label: translate('this_month') }];


  // Get the report data by calling stalesBreakDownReportData with translate
  const stalesBreakDownReport = stalesBreakDownReportData(translate);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('dashboard')} />
      <Grid container spacing={2} mt={2}>
        {statisticsData.map((stat, index) =>
        <Grid size={{ xs: 6, md: 6, lg: 3 }} key={stat.id}>
            <StatisticsCard
            key={index}
            title={stat.title}
            value={stat.value}
            isPositive={stat.isPositive}
            icon={stat.icon} />

          </Grid>
        )}
      </Grid>

      <Paper sx={{ mt: 2, p: 2 }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography>{translate('sales_breakdowns')}</Typography>
          <GSSelectInput
            variant="elevate"
            // Sets the GS styling
            options={rangeOptions}
            value={selectedRange}
            onChange={(value) => setSelectedRange(value || '')} />

        </Stack>
        <LineChart
          xAxis={[
          {
            scaleType: 'point',
            data: getXAxisData()
          }]
          }
          series={[
          {
            data: getChartData(),
            color: theme.palette.primary.main
          }]
          }
          height={400} />

      </Paper>

      <Stack spacing={2} mt={2} direction={{ xs: 'column', sm: 'row' }}>
        <SalesReportBreakdown stalesBreakDownReportData={stalesBreakDownReport} />
        <Stack flex={1} sx={{ height: 'fit-content' }}>
          <DashboardNote />
          <ProductStockAlert productStockData={productStockData} />
          <ProductExpiryAlert productExpiryData={productExpiryData} />
        </Stack>
      </Stack>
    </Box>);

}