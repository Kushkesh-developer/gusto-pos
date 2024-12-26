'use client';
import { Stack } from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';
import Head from 'next/head';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import React, { useEffect, useState } from 'react';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';

import { manageMock } from '@/mock/inventory';
import InventoryDrawer from '@/components/inventory/InventoryDrawer';

export default function ManageInventoryPage() {
  const { translate } = useLocalization();

  // Table Column Configuration
  const columnNames = [
    { label: translate('reference'), key: 'reference', visible: true },
    { label: translate('item'), key: 'item', visible: true },
    { label: translate('quantity'), key: 'quantity', visible: true },
    { label: translate('date'), key: 'date', visible: true },
    { label: translate('from'), key: 'from', visible: true },
    { label: translate('to'), key: 'to', visible: true },
    { label: translate('status'), key: 'status', visible: true },
  ];

  // State Management
  const [response] = useState(manageMock);
  const [filteredColumns, setFilteredColumns] = useState(manageMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedItem, setSelectedItem] = useState(''); // Default to 'All'
  const [selectedFrom, setSelectedFrom] = useState(''); // Default to 'All'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const [columns, setColumns] = useState(columnNames);

  // Dropdown Options for Filters
  const itemOptions = [
    { label: translate('all'), value: '' }, // Default 'All' option
    ...Array.from(new Set(manageMock.map((item) => item.item))).map((item) => ({
      label: item,
      value: item.toLowerCase().replace(/\s+/g, ''),
    })),
  ];

  const fromOptions = [
    { label: translate('all'), value: '' }, // Default 'All' option
    ...Array.from(new Set(manageMock.map((item) => item.from))).map((from) => ({
      label: from,
      value: from.toLowerCase().replace(/\s+/g, ''),
    })),
  ];

  // Filter Logic
  useEffect(() => {
    const filteredRows = response.filter((item) => {
      // Search Query Filter
      const searchString = `${item.reference} ${item.item}`.toLowerCase();
      const matchesSearch = !searchQuery || searchString.includes(searchQuery.toLowerCase().trim());

      // Item Filter: Show all if 'All' is selected
      const matchesItem =
        !selectedItem ||
        selectedItem === '' ||
        item.item.toLowerCase().replace(/\s+/g, '') === selectedItem;

      // From Filter: Show all if 'All' is selected
      const matchesFrom =
        !selectedFrom ||
        selectedFrom === '' ||
        item.from.toLowerCase().replace(/\s+/g, '') === selectedFrom;

      return matchesSearch && matchesItem && matchesFrom;
    });

    setFilteredColumns(filteredRows);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedItem, selectedFrom, response]);

  return (
    <Stack>
      <Head>
        <title>{translate('manage_inventory')} - Inventory Management</title>
      </Head>
      <div>
        <InventoryDrawer open={showUserDrawer} onClose={() => setShowUserDrawer(false)} />
        <div>
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
                  options={itemOptions}
                  placeholder={translate('select_item')}
                  height="40px"
                  variant="theme"
                  placeholderColor="primary"
                  value={selectedItem}
                  onChange={(value) => setSelectedItem(value || '')} // Default to 'All'
                />
                <GSSelectInput
                  options={fromOptions}
                  placeholder={translate('select_from')}
                  height="40px"
                  variant="theme"
                  placeholderColor="primary"
                  value={selectedFrom}
                  onChange={(value) => setSelectedFrom(value || '')} // Default to 'All'
                />
              </Stack>
            }
          />
        </div>
        <GSTable
          columns={columns}
          filteredColumns={filteredColumns}
          currentItems={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e, page) => setCurrentPage(page)}
          keyMapping={Object.fromEntries(columnNames.map((col) => [col.label, col.key]))}
          setFilteredColumns={setFilteredColumns}
        />
      </div>
    </Stack>
  );
}
