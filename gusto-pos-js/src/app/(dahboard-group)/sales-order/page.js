'use client';
import { Box, Stack } from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';
import Head from 'next/head';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import React, { useEffect, useState } from 'react';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';

import { salesMockData } from '@/mock/sales';

export default function ManageSalesPage() {
  const { translate } = useLocalization();
  const getColumns = () => [
  { label: translate('reference'), key: 'reference', visible: true },
  { label: translate('item'), key: 'item', visible: true },
  { label: translate('quantity'), key: 'volume', visible: true },
  { label: translate('date'), key: 'date', visible: true },
  { label: translate('from'), key: 'from', visible: true },
  { label: translate('to'), key: 'to', visible: true },
  { label: translate('status'), key: 'status', visible: true }];


  const [response] = useState(salesMockData);
  const [filteredColumns, setFilteredColumns] = useState(salesMockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState('all');
  const [selectedFrom, setSelectedFrom] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(getColumns());
  // Dynamically generate item options with "All" as the first option
  const itemOptions = [
  { label: translate('all_items'), value: 'all' },
  ...Array.from(new Set(salesMockData.map((item) => item.item))).map((item) => ({
    label: item,
    value: item.toLowerCase().replace(/\s+/g, '')
  }))];


  // Dynamically generate 'from' options with "All" as the first option
  const fromOptions = [
  { label: translate('all_sources_from'), value: 'all' },
  ...Array.from(new Set(salesMockData.map((item) => item.from))).map((from) => ({
    label: from,
    value: from.toLowerCase().replace(/\s+/g, '')
  }))];


  // Filter users based on search query and filters
  useEffect(() => {
    const filteredRows = response.filter((item) => {
      // Search query filter
      const searchString = `${item.reference} ${item.item}`.toLowerCase();
      const matchesSearch = !searchQuery || searchString.includes(searchQuery.toLowerCase().trim());

      // Item filter
      const matchesItem =
      selectedItem === 'all' ||
      item.item.toLowerCase().replace(/\s+/g, '') ===
      selectedItem.toLowerCase().replace(/\s+/g, '');

      // From filter
      const matchesFrom =
      selectedFrom === 'all' ||
      item.from.toLowerCase().replace(/\s+/g, '') ===
      selectedFrom.toLowerCase().replace(/\s+/g, '');

      return matchesSearch && matchesItem && matchesFrom;
    });

    setFilteredColumns(filteredRows);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedItem, selectedFrom, response]);
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  return (
    <Stack>
      <Head>
        <title>{translate('manage_sales')} - Sales Management</title>
      </Head>
      <div>
        <Box style={{ marginTop: '15px' }}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            showPrint
            tableTitlePrint={translate('manage_sales_list')}
            showExcel
            showPdf
            showFilter
            currentItems={currentItems}
            renderFilterElement={
            <Stack direction="row" spacing={2}>
                <GSSelectInput
                options={itemOptions}
                placeholder={translate('all_items')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedItem}
                onChange={(value) => setSelectedItem(value || 'all')} />

                <GSSelectInput
                options={fromOptions}
                placeholder={translate('all_sources')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedFrom}
                onChange={(value) => setSelectedFrom(value || 'all')} />

              </Stack>
            } />

        </Box>
        <GSTable
          columns={columns}
          filteredColumns={filteredColumns}
          currentItems={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e, page) => setCurrentPage(page)}
          setFilteredColumns={setFilteredColumns} />

      </div>
    </Stack>);

}