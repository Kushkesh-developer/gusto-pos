'use client';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { areaOrderMock, filterByType } from '@/mock/reports';
import PageHeader from '@/components/widgets/headers/PageHeader';


const Page = () => {
  const { translate } = useLocalization();
  const columnNames = [
  { label: translate('no'), key: 'No', visible: true },
  { label: translate('location'), key: 'Location', visible: true },
  { label: translate('frequency'), key: 'Frequency', visible: true },
  { label: translate('outlet'), key: 'Outlet', visible: true },
  { label: translate('total_spending'), key: 'TotalSpending', visible: true },
  { label: translate('type'), key: 'Type', visible: true }];

  const [response] = useState(areaOrderMock);
  const [filteredColumns, setFilteredColumns] = useState(areaOrderMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  useEffect(() => {
    const filteredRows = response.filter((items) => {
      const item = `${items.Outlet}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('area_order_report')} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          renderFilterElement={
          <Stack direction="row" spacing={2}>
              <GSSelectInput
              options={filterByType}
              placeholder={translate('filter_by_outlet')}
              height="40px"
              variant="theme" // Pass type as "theme" to enable primary color styling
              placeholderColor="primary" // Ensures placeholder text color is primary
            />
              <GSSelectInput
              options={filterByType}
              placeholder={translate('filter_by_type')}
              height="40px"
              variant="theme" // Pass type as "theme" to enable primary color styling
              placeholderColor="primary" // Ensures placeholder text color is primary
            />
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