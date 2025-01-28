'use client';
import { Stack, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { topProductMockData } from '@/mock/reports';
import { outlets } from '@/mock/common';

import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  const { translate } = useLocalization();
  const getColumns = () => [
    { label: translate('item_name'), key: 'itemName', visible: true },
    { label: translate('category'), key: 'category', visible: true },
    { label: translate('outlet'), key: 'outlet', visible: true },
    { label: translate('qty'), key: 'qty', visible: true },
    { label: translate('sale'), key: 'sale', visible: true },
  ];

  const [response] = useState(topProductMockData);
  const [filteredColumns, setFilteredColumns] = useState(topProductMockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(getColumns());

  // Use predefined outlets with a default 'Select Outlet' option
  const outletOptions = [{ label: translate('select_outlet'), value: '' }, ...outlets];
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  useEffect(() => {
    // Filter by search query and outlet
    const filteredRows = response.filter((items) => {
      const item =
        ` ${items.id} ${items.itemName} ${items.category}  ${items.outlet}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      const matchesSearch = item.includes(sanitizedSearch);

      // Find the outlet object based on the selected value and compare with its label
      const selectedOutletObj = outlets.find((outlet) => outlet.value === selectedOutlet);
      const matchesOutlet =
        !selectedOutlet ||
        (selectedOutletObj && items.outlet.trim() === selectedOutletObj.label.trim());

      return matchesSearch && matchesOutlet;
    });

    setFilteredColumns(filteredRows);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedOutlet, response]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('top_product_reports')} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <GSSelectInput
                options={outletOptions}
                placeholder={translate('filter_by_outlet')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedOutlet}
                onChange={(value) => setSelectedOutlet(value || '')}
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
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
      />
    </Box>
  );
};

export default Page;
