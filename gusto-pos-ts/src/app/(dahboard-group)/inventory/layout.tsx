"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Divider } from '@mui/material';
import { useLocalization } from "@/context/LocalizationProvider";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  const { translate } = useLocalization();
  const router = useRouter();
  const path = usePathname();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: translate('manage_inventory'), route: 'manage-inventory' },
    { label: translate('adjustment'), route: 'adjustment' },
    { label: translate('recieve'), route: 'recieve' },
    { label: translate('transfer'), route: 'transfer' },
    { label: translate('reconciliation'), route: 'reconciliation' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    router.push(`/inventory/${tabs[newValue].route}`);
  };

  useEffect(() => {
    const matchedTab = tabs.findIndex(tab => path.endsWith(tab.route));
    if (matchedTab >= 0) {
      setActiveTab(matchedTab);
    }
  }, [path]);

  return (
    <Box sx={{ display: 'flex', padding: '24px' }}>
      
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom color="primary">
          {tabs[activeTab].label}
        </Typography>
        <Divider />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '15px' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="inventory tabs">
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ marginTop: '16px' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
