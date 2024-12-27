'use client';
import { Stack, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { revenueMock } from '@/mock/reports';
import { outlets } from '@/mock/common';

import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  const { translate } = useLocalization();

  const columnNames = [
  { label: translate('date'), key: 'date', visible: true },
  { label: translate('outlet'), key: 'outlet', visible: true },
  { label: translate('sale'), key: 'sale', visible: true },
  { label: translate('tax'), key: 'tax', visible: true },
  { label: translate('disc_amount'), key: 'discAmount', visible: true },
  { label: translate('cost'), key: 'cost', visible: true },
  {
    label: translate('action'),
    key: 'action',
    visible: true,
    isAction: true,
    actions: [
    {
      type: 'delete',
      handler: (id) => handleDelete(id)
    }]

  }];


  const handleDelete = (id) => {
    console.log('Delete entry with ID:', id);
    setFilteredColumns((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const [response] = useState(revenueMock);
  const [filteredColumns, setFilteredColumns] = useState(revenueMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  // Outlet options with default 'Select Outlet'
  const outletOptions = [{ label: translate('select_outlet'), value: '' }, ...outlets];

  useEffect(() => {
    let filteredRows = response;

    // Apply search query filter
    if (searchQuery) {
      filteredRows = filteredRows.filter((items) => {
        const item = `${items.outlet}`.toLowerCase();
        const sanitizedSearch = searchQuery.toLowerCase().trim();
        return item.includes(sanitizedSearch);
      });
    }

    // Apply outlet filter using label-based matching
    if (selectedOutlet) {
      const selectedOutletObj = outlets.find((outlet) => outlet.value === selectedOutlet);
      filteredRows = filteredRows.filter(
        (item) => selectedOutletObj && item.outlet.trim() === selectedOutletObj.label.trim()
      );
    }

    // Set filtered data
    setFilteredColumns(filteredRows);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchQuery, selectedOutlet, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('revenue_sale_report')} showMobileView={true} />

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
              onChange={(value) => setSelectedOutlet(value || '')} />

            </Stack>
          }
          showPrint
          showExcel
          showPdf
          showFilter />

      </Stack>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns} />

    </Box>);

};

export default Page;