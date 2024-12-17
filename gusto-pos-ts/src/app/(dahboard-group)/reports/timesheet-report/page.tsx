'use client';
import { Stack, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { timeMock, filterByRole, filterByName } from '@/mock/reports';
import PageHeader from '@/components/widgets/headers/PageHeader';

import { ColumnType } from '@/types/table-types';

const Page = () => {
  const { translate } = useLocalization();
  const columnNames: ColumnType[] = [
    { label: translate('staff_name'), key: 'staffName', visible: true },
    { label: translate('role'), key: 'role', visible: true },
    { label: translate('outlet'), key: 'outlet', visible: true },
    { label: translate('clock_in'), key: 'clockIn', visible: true },
    { label: translate('clock_out'), key: 'clockOut', visible: true },
    { label: translate('total_time'), key: 'totalTime', visible: true },
    { label: translate('total_revenue'), key: 'totalRevenue', visible: true },
  ];
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
      const item = `${items.outlet}`.toLowerCase();
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
                options={filterByRole}
                placeholder={translate('select_by_role')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
              <GSSelectInput
                options={filterByName}
                placeholder={translate('select_by_name')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
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
