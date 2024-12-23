'use client';

import { Box } from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';
import Head from 'next/head';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import React, { useEffect, useState } from 'react';

import { salesMockData } from '@/mock/sales';

export default function ManageInventoryPage() {
  const { translate } = useLocalization();
  const columnNames = [
    { label: translate('reference'), key: 'reference', visible: true },
    { label: translate('item'), key: 'item', visible: true },
    { label: translate('quantity'), key: 'quantity', visible: true },
    { label: translate('date'), key: 'date', visible: true },
    { label: translate('from'), key: 'from', visible: true },
    { label: translate('to'), key: 'to', visible: true },
    { label: translate('status'), key: 'status', visible: true },
  ];

  const [response] = useState(salesMockData);
  const [filteredColumns, setFilteredColumns] = useState(salesMockData);
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
    <>
      <Head>
        <title>{translate('transfer')}</title>
      </Head>
      <div>
        <Box style={{ marginTop: '15px' }}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            showPrint
            showExcel
            showPdf
            showFilter
            currentItems={currentItems}
          />
        </Box>
        <GSTable
          columns={columns}
          filteredColumns={filteredColumns}
          currentItems={currentItems} // Ensure this is passed
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e, page) => setCurrentPage(page)}
          setFilteredColumns={setFilteredColumns} />

      </div>
    </>);

}
