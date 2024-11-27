'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Tabs, Tab, Typography, Divider } from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
}






export default function InventoryLayout({ children }) {
  const { translate } = useLocalization();
  const router = useRouter();
  const path = usePathname();
  const [activeTab, setActiveTab] = useState(0);

  // Define tabs with translated labels
  const tabs = [
  { label: translate('view_queue'), route: '/queue-management/view-queue' },
  { label: '1-2', route: '/queue-management/view-queue/today-order' },
  { label: '3-4', route: '/queue-management/view-queue/future-order' },
  { label: '5+', route: '/queue-management/view-queue/serve-later-order' }];


  // Handle tab change and routing
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    router.push(tabs[newValue].route);
  };

  // Update active tab based on the current path
  useEffect(() => {
    const matchedTabIndex = tabs.findIndex((tab) => path === tab.route);
    if (matchedTabIndex >= 0) {
      setActiveTab(matchedTabIndex);
    }
  }, [path, tabs]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom color="primary">
          {tabs[activeTab]?.label || ''}
        </Typography>
        <Divider />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '15px' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="Queue Management Tabs">
            {tabs.map((tab, index) =>
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
            )}
          </Tabs>
        </Box>
        <Box sx={{ marginTop: '16px' }}>{children}</Box>
      </Box>
    </Box>);

}