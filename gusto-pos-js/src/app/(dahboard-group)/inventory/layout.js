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

  const tabs = [
  { label: translate('manage_inventory'), route: 'manage-inventory' },
  { label: translate('adjustment'), route: 'adjustment' },
  { label: translate('recieve'), route: 'recieve' },
  { label: translate('transfer'), route: 'transfer' },
  { label: translate('reconciliation'), route: 'reconciliation' }];


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    router.push(`/inventory/${tabs[newValue].route}`);
  };

  useEffect(() => {
    const matchedTab = tabs.findIndex((tab) => path.endsWith(tab.route));
    if (matchedTab >= 0) {
      setActiveTab(matchedTab);
    }
  }, [path]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom color="primary">
          {tabs[activeTab]?.label}
        </Typography>
        <Divider />
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            marginTop: '15px',
            overflowX: 'auto' // Allow horizontal scrolling
          }}>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="inventory tabs"
            variant="scrollable" // Make tabs scrollable
            scrollButtons="auto" // Show scroll buttons when needed
          >
            {tabs.map((tab, index) =>
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
            )}
          </Tabs>
        </Box>
        <Box sx={{ marginTop: '16px' }}>{children}</Box>
      </Box>
    </Box>);

}