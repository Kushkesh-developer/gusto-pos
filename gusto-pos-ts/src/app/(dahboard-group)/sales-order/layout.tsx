'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Tabs, Tab, Typography, Divider } from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

type Tab = {
  label: string;
  route?: string; // optional
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  const { translate } = useLocalization();
  const router = useRouter();
  const path = usePathname();
  const [activeTab, setActiveTab] = useState(0);

  const tabs: Tab[] = [
    { label: translate('sales_order'), route: '' }, // This will route to "/sales-order"
    { label: translate('today_order'), route: 'today-order' },
    { label: translate('future_order'), route: 'future-order' },
    { label: translate('closed_order'), route: 'closed-order' },
    { label: translate('serve_later_order'), route: 'serve-later-order' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);

    const newRoute = tabs[newValue].route || ''; // Will be '' if undefined
    const fullRoute = newRoute ? `/sales-order/${newRoute}` : '/sales-order'; // Append sub-route if available
    router.push(fullRoute); // Push the correct route to the browser
  };

  useEffect(() => {
    // Match the full route based on path and set the active tab index
    const matchedTab = tabs.findIndex((tab) => {
      const fullRoute = tab.route ? `/sales-order/${tab.route}` : '/sales-order';
      return path === fullRoute;
    });

    if (matchedTab >= 0) {
      setActiveTab(matchedTab);
    }
  }, [path]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom color="primary">
          {tabs[activeTab].label}
        </Typography>
        <Divider />
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            marginTop: '15px',
            overflowX: 'auto', // Enable horizontal scrolling
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="sales Order tabs"
            variant="scrollable" // Make tabs scrollable
            scrollButtons="auto" // Automatically show scroll buttons if needed
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ marginTop: '16px' }}>{children}</Box>
      </Box>
    </Box>
  );
}
