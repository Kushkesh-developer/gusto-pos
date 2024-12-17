'use client';
import { Stack, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { timeMock } from '@/mock/reports';
import PageHeader from '@/components/widgets/headers/PageHeader';



const Page = () => {
  const { translate } = useLocalization();
  const columnNames = [
  { label: translate('staff_name'), key: 'staffName', visible: true },
  { label: translate('role'), key: 'role', visible: true },
  { label: translate('outlet'), key: 'outlet', visible: true },
  { label: translate('clock_in'), key: 'clockIn', visible: true },
  { label: translate('clock_out'), key: 'clockOut', visible: true },
  { label: translate('total_time'), key: 'totalTime', visible: true },
  { label: translate('total_revenue'), key: 'totalRevenue', visible: true }];


  const [response] = useState(timeMock);
  const [filteredColumns, setFilteredColumns] = useState(timeMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  // Extract unique roles and names from the mock data
  const uniqueRoles = Array.from(new Set(timeMock.map((item) => item.role)));
  const uniqueNames = Array.from(new Set(timeMock.map((item) => item.staffName)));

  // Prepare options for select inputs, adding 'All' option
  const roleOptions = [
  { value: '', label: translate('all') }, // 'All' option
  ...uniqueRoles.map((role) => ({
    value: role,
    label: role
  }))];


  const nameOptions = [
  { value: '', label: translate('all') }, // 'All' option
  ...uniqueNames.map((name) => ({
    value: name,
    label: name
  }))];


  useEffect(() => {
    // Apply multiple filters
    const filteredRows = response.filter((item) => {
      // Outlet search filter
      const matchesOutlet = searchQuery ?
      `${item.outlet}`.toLowerCase().includes(searchQuery.toLowerCase().trim()) :
      true;

      // Role filter, if not "All" (empty string)
      const matchesRole = selectedRole ? item.role === selectedRole : true;

      // Name filter, if not "All" (empty string)
      const matchesName = selectedName ? item.staffName === selectedName : true;

      return matchesOutlet && matchesRole && matchesName;
    });

    setFilteredColumns(filteredRows);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedRole, selectedName, response]);

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
              options={roleOptions}
              placeholder={translate('select_by_role')}
              height="40px"
              variant="theme"
              placeholderColor="primary"
              onChange={(value) => setSelectedRole(value)}
              value={selectedRole} />

              <GSSelectInput
              options={nameOptions}
              placeholder={translate('select_by_name')}
              height="40px"
              variant="theme"
              placeholderColor="primary"
              onChange={(value) => setSelectedName(value)}
              value={selectedName} />

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