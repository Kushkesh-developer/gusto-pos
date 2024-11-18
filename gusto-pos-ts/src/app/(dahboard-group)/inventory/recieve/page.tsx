'use client';

import { Box } from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';
import Head from 'next/head';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import React, { useEffect, useState } from 'react';
import { ColumnType } from '@/types/table-types';
import { mockResponse } from '@/mock/inventory';
const columnNames: ColumnType[] = [
  { label: 'Reference', key: 'reference', visible: true },
  { label: 'Item', key: 'item', visible: true },
  { label: 'Quantity', key: 'quantity', visible: true },
  { label: 'Date', key: 'date', visible: true },
  { label: 'From', key: 'from', visible: true },
  { label: 'To', key: 'to', visible: true },
  { label: 'Status', key: 'status', visible: true },
];

export default function ManageInventoryPage() {
  const { translate } = useLocalization();
  const [response] = useState(mockResponse);
  const [filteredColumns, setFilteredColumns] = useState(mockResponse);
  const [searchQuery, setSearchQuery] = useState('');
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        <title>{translate('recieve')}</title>
      </Head>
      <Box>
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
          handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
          keyMapping={Object.fromEntries(columnNames.map((col) => [col.label, col.key]))}
          setFilteredColumns={setFilteredColumns}
        />
      </Box>
    </>
  );
}
