"use client";

import { Box, Typography, Divider, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useLocalization } from "@/context/LocalizationProvider";
import Head from 'next/head';

export default function ManageInventoryPage() {
  const { translate } = useLocalization();

  const mockData = [
    { reference: 'NM219312N', item: 'Burger Bun', quantity: 50, date: '17/09/2020 (20:43)', from: 'Bukit Batok', to: 'Chai Chee', status: 'In progress' },
    { reference: 'NM219312N', item: 'Burger Bun', quantity: 50, date: '17/09/2020 (20:43)', from: 'Bukit Batok', to: 'Chai Chee', status: 'Transferred' },
  ];

  return (
    <>
      <Head>
        <title>{translate('manage_inventory')} - Inventory Management</title>
      </Head>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <TextField placeholder={translate('search')} variant="outlined" sx={{ width: '25%' }} />
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
      </Box>
    </>
  );
}
