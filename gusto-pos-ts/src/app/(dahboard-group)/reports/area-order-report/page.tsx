'use client';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { areaOrderMock, outlets } from '@/mock/reports';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { ColumnType } from '@/types/table-types';

// Predefined outlets list

const Page = () => {
  const { translate } = useLocalization();
  const columnNames: ColumnType[] = [
    { label: translate('no'), key: 'no', visible: true },
    { label: translate('location'), key: 'location', visible: true },
    { label: translate('frequency'), key: 'frequency', visible: true },
    { label: translate('outlet'), key: 'outlet', visible: true },
    { label: translate('total_spending'), key: 'totalSpending', visible: true },
    { label: translate('type'), key: 'type', visible: true },
  ];

  const [response] = useState(areaOrderMock);
  const [filteredColumns, setFilteredColumns] = useState(areaOrderMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Dynamically generate location options
  const locationOptions = [
    { label: translate('select_location'), value: '' },
    ...Array.from(new Set(areaOrderMock.map((item) => item.location))).map((location) => ({
      label: location,
      value: location,
    })),
  ];

  // Use predefined outlets with a default 'Select Outlet' option
  const outletOptions = [{ label: translate('select_outlet'), value: '' }, ...outlets];

  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  useEffect(() => {
    const filteredRows = response.filter((item) => {
      // Search query filter
      const itemSearchString = `${item.outlet} ${item.location}`.toLowerCase();
      const matchesSearch =
        !searchQuery || itemSearchString.includes(searchQuery.toLowerCase().trim());

      // Location filter
      const matchesLocation = !selectedLocation || item.location.trim() === selectedLocation.trim();

      // Outlet filter
      const matchesOutlet = !selectedOutlet || item.outlet.trim() === selectedOutlet.trim();

      return matchesSearch && matchesLocation && matchesOutlet;
    });

    setFilteredColumns(filteredRows);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedLocation, selectedOutlet, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('area_order_report')} showMobileView={true} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <GSSelectInput
                options={locationOptions}
                placeholder={translate('select_from_location')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedLocation}
                onChange={(value) => setSelectedLocation(value || '')}
              />
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
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
      />
    </Box>
  );
};

export default Page;
