"use client"
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Divider, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@mui/material';
import { useLocalization } from "@/context/LocalizationProvider";
import EditIcon from '@mui/icons-material/Edit';
// import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function TransferPage() {
  const { translate } = useLocalization();
  const router = useRouter();
  const path =usePathname()
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    router.push(`/inventory/${tabs[newValue].route}`);
  };

  const tabs = [
    { label: translate('inventory'), route: 'inventory' },
    { label: translate('transfer'), route: 'transfer' },
    { label: translate('receive'), route: 'receive' },
    { label: translate('adjustment'), route: 'adjustment' },
    { label: translate('reconciliation'), route: 'reconciliation' },
  ];

  useEffect(() => {
    const matchedTab = tabs.findIndex(tab => path.includes(tab.route));
    if (matchedTab >= 0) {
      setActiveTab(matchedTab);
    }
  }, [path]);

  const mockData = [
    { reference: 'NM219312N', item: 'Burger Bun', quantity: 50, date: '17/09/2020 (20:43)', from: 'Bukit Batok', to: 'Chai Chee', status: 'In progress' },
    { reference: 'NM219312N', item: 'Burger Bun', quantity: 50, date: '17/09/2020 (20:43)', from: 'Bukit Batok', to: 'Chai Chee', status: 'Transferred' },
  ];

  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom color="primary">
        {translate('transfer')}
      </Typography>
      <Divider />
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '15px' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="inventory tabs">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <TextField placeholder={translate('search')} variant="outlined" sx={{ width: '25%' }} />
          {/* <DatePicker
            label={translate('enter_date')}
            renderInput={(params) => <TextField {...params} />}
          /> */}
          <Button variant="outlined">{translate('filter_by_stock_level')}</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translate('reference')}</TableCell>
              <TableCell>{translate('transfer_item')}</TableCell>
              <TableCell>{translate('quantity')}</TableCell>
              <TableCell>{translate('transfer_date')}</TableCell>
              <TableCell>{translate('from')}</TableCell>
              <TableCell>{translate('to')}</TableCell>
              <TableCell>{translate('status')}</TableCell>
              <TableCell>{translate('action')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.reference}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Typography>{translate('receive_tab_content')}</Typography>
      </TabPanel>
      {/* Add more TabPanels for other tabs as needed */}
    </Box>
  );
}
