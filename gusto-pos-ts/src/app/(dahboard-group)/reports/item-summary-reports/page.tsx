'use client';
import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { ColumnType } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { itemMock } from '@/mock/reports';
import { outlets } from '@/mock/common';

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(itemMock);
  const [filteredColumns, setFilteredColumns] = useState(itemMock);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedOutlet, setSelectedOutlet] = useState<string>('');

  // Sanitize and generate unique item names from mock data
  const uniqueItemNames = Array.from(new Set(itemMock.map((item) => item.itemName.trim())));
  const selectItem = [
    { label: translate('select_item'), value: '' },
    ...uniqueItemNames.map((name) => ({
      label: name,
      value: name,
    })),
  ];

  // Use predefined outlets with a default 'Select Outlet' option
  const sanitizedFilterByOutlet = [{ label: translate('select_outlet'), value: '' }, ...outlets];

  const getColumns = (): ColumnType[] => [
    { label: translate('item_name'), key: 'itemName', visible: true },
    { label: translate('outlet'), key: 'outlet', visible: true },
    { label: translate('Qty'), key: 'qty', visible: true },
    { label: translate('unit'), key: 'unit', visible: true },
    { label: translate('min_qty'), key: 'minQty', visible: true },
    { label: translate('max_qty'), key: 'maxQty', visible: true },
    { label: translate('item_type'), key: 'itemType', visible: true },
  ];
  const [columns, setColumns] = useState(getColumns());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  useEffect(() => {
    let filteredRows = response;

    // Apply search query filter
    if (searchQuery) {
      filteredRows = filteredRows.filter((items) => {
        const item =
          `${items.itemName} ${items.outlet} ${items.qty} ${items.unit} ${items.itemType}`.toLowerCase();
        const sanitizedSearch = searchQuery.toLowerCase().trim();
        return item.includes(sanitizedSearch);
      });
    }

    // Apply filters with robust matching
    if (selectedItem !== '' && selectedOutlet !== '') {
      // Find the outlet object based on the selected value
      const selectedOutletObj = outlets.find((outlet) => outlet.value === selectedOutlet);
      filteredRows = filteredRows.filter(
        (item) =>
          item.itemName.trim() === selectedItem.trim() &&
          (selectedOutletObj ? item.outlet.trim() === selectedOutletObj.label.trim() : false),
      );
    } else if (selectedItem !== '') {
      filteredRows = filteredRows.filter((item) => item.itemName.trim() === selectedItem.trim());
    } else if (selectedOutlet !== '') {
      // Find the outlet object based on the selected value
      const selectedOutletObj = outlets.find((outlet) => outlet.value === selectedOutlet);
      filteredRows = filteredRows.filter(
        (item) => selectedOutletObj && item.outlet.trim() === selectedOutletObj.label.trim(),
      );
    }

    setFilteredColumns(filteredRows);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchQuery, selectedItem, selectedOutlet, response]);

  // Handle item selection
  const handleItemSelect = (value: string | null) => {
    setSelectedItem(value || '');
  };

  // Handle outlet selection
  const handleOutletSelect = (value: string | null) => {
    setSelectedOutlet(value || '');
  };

  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('item_summary_reports')} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          tableTitle={translate('item_summary_reports')}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <GSSelectInput
                options={selectItem}
                placeholder={translate('select_item')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedItem}
                onChange={handleItemSelect}
              />
              <GSSelectInput
                options={sanitizedFilterByOutlet}
                placeholder={translate('select_outlet')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedOutlet}
                onChange={handleOutletSelect}
              />
            </Stack>
          }
          showPrint
          showExcel
          showPdf
          showFilter
        />
      </Stack>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
      />
    </Box>
  );
};

export default Page;
