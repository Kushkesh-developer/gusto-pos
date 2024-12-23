'use client';
import { Stack, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { topProductMockData, outlets } from '@/mock/reports';
import { ColumnType } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';

// Predefined outlets list

const Page = () => {
  const { translate } = useLocalization();
  const columnNames: ColumnType[] = [
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
  const [columns, setColumns] = useState(columnNames);

  // Use predefined outlets with a default 'Select Outlet' option
  const outletOptions = [{ label: translate('select_outlet'), value: '' }, ...outlets];

  useEffect(() => {
    // Filter by search query and outlet
    const filteredRows = response.filter((items) => {
      const item =
        ` ${items.id} ${items.itemName} ${items.category}  ${items.outlet}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      const matchesSearch = item.includes(sanitizedSearch);

      // Outlet filter
      const matchesOutlet = !selectedOutlet || items.outlet.trim() === selectedOutlet.trim();

      return matchesSearch && matchesOutlet;
    });

    setFilteredColumns(filteredRows);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedOutlet, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('top_product_reports')} showMobileView={true} />

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
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
      />
    </Box>
  );
};

export default Page;
