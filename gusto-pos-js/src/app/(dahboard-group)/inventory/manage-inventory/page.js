'use client';
import { Box, Stack } from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';
import Head from 'next/head';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import React, { useEffect, useState } from 'react';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';

import { groupOptions, modifierOptions, manageMock } from '@/mock/inventory';
import InventoryDrawer from '@/components/inventory/InventoryDrawer';

//mock data

export default function ManageInventoryPage() {
  const { translate } = useLocalization();
  const columnNames = [
  { label: translate('reference'), key: 'reference', visible: true },
  { label: translate('item'), key: 'item', visible: true },
  { label: translate('quantity'), key: 'quantity', visible: true },
  { label: translate('date'), key: 'date', visible: true },
  { label: translate('from'), key: 'from', visible: true },
  { label: translate('to'), key: 'to', visible: true },
  { label: translate('status'), key: 'status', visible: true }];

  const [response] = useState(manageMock);
  const [filteredColumns, setFilteredColumns] = useState(manageMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.reference} ${user.item}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Stack>
      <Head>
        <title>{translate('manage_inventory')} - Inventory Management</title>
      </Head>
      <Box>
        <InventoryDrawer open={showUserDrawer} onClose={() => setShowUserDrawer(false)} />
        <Box>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            tableTitle={translate('add_inventory')}
            showPrint
            showExcel
            showPdf
            showFilter
            currentItems={currentItems}
            customButtonAction={() => setShowUserDrawer(true)}
            renderFilterElement={
            <Stack direction="row" spacing={2}>
                <GSSelectInput
                options={groupOptions}
                placeholder={translate('select_group')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
                // sx={{mr:2}}
              />
                <GSSelectInput
                options={modifierOptions}
                placeholder={translate('select_modifier')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
              </Stack>
            } />

        </Box>
        <GSTable
          columns={columns}
          filteredColumns={filteredColumns}
          currentItems={currentItems} // Ensure this is passed
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e, page) => setCurrentPage(page)}
          keyMapping={Object.fromEntries(columnNames.map((col) => [col.label, col.key]))}
          setFilteredColumns={setFilteredColumns} />

      </Box>
    </Stack>);

}