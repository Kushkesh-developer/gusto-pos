'use client';
import { Stack, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { timeMock, filterByType } from '@/mock/reports';
import PageHeader from '@/components/widgets/headers/PageHeader';



const Page = () => {
  const { translate } = useLocalization();
  const columnNames = [
  { label: translate('staff_name'), key: 'StaffName', visible: true },
  { label: translate('role'), key: 'Role', visible: true },
  { label: translate('outlet'), key: 'Outlet', visible: true },
  { label: translate('clock_in'), key: 'ClockIn', visible: true },
  { label: translate('clock_out'), key: 'ClockOut', visible: true },
  { label: translate('total_time'), key: 'TotalTime', visible: true },
  { label: translate('total_revenue'), key: 'TotalRevenue', visible: true }];

  const [response] = useState(timeMock);
  const [filteredColumns, setFilteredColumns] = useState(timeMock);
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
      <PageHeader title={translate('time_sheet_report')} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
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
              placeholder={translate('FilterByType')}
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