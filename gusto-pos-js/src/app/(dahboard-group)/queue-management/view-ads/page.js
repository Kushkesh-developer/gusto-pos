'use client';
import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';

import { floorOptions, outletsOptions, adsMock } from '@/mock/queue';
import CdsDrawer from '@/components/queue-management/CdsDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  const { translate } = useLocalization();
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [response] = useState(adsMock);
  const [filteredColumns, setFilteredColumns] = useState(adsMock);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const columnNames = [
  { label: translate('order'), key: 'order', visible: true },
  { label: translate('name'), key: 'Name', visible: true },
  { label: translate('image'), key: 'image', visible: true, type: 'image' },
  { label: translate('outlets'), key: 'outlets', visible: true },
  { label: translate('start_date'), key: 'startDate', visible: true },
  { label: translate('end_date'), key: 'endDate', visible: true },
  { label: translate('impression'), key: 'impression', visible: true },
  { label: translate('status'), key: 'status', visible: true },
  {
    label: translate('action'),
    key: 'action',
    visible: true,
    isAction: true,
    actions: [
    {
      type: 'edit',
      // eslint-disable-next-line no-console
      handler: (id) => handleEdit(id)
    },
    {
      type: 'delete',
      // eslint-disable-next-line no-console
      handler: (id) => handleDelete(id)
    }]

  }];

  const handleEdit = (id) => {
    // eslint-disable-next-line no-console
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id) => {
    // eslint-disable-next-line no-console
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.order} ${user.Name} ${user.status}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('queue_ads')} />

      <Box mt={'40px'}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          renderFilterElement={
          <Stack direction="row" spacing={2}>
              <GSSelectInput
              options={floorOptions}
              placeholder={translate('select_floor')}
              height="40px"
              variant="theme" // Pass type as "theme" to enable primary color styling
              placeholderColor="primary" // Ensures placeholder text color is primary
            />
              <GSSelectInput
              options={outletsOptions}
              placeholder={translate('select_outlets')}
              height="40px"
              variant="theme" // Pass type as "theme" to enable primary color styling
              placeholderColor="primary" // Ensures placeholder text color is primary
            />
            </Stack>
          }
          showFilter />

      </Box>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns} />

      <Box mt={'50px'}>
        <PageHeader title={translate('waiting_list')} />
        <CdsDrawer open={showUserDrawer} onClose={() => setShowUserDrawer(false)} />
        <Box mt={'40px'}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            tableTitle={translate('add_ads')}
            showFilter
            customButtonAction={() => setShowUserDrawer(true)}
            currentItems={currentItems}
            renderFilterElement={
            <Stack direction="row" spacing={2}>
                <GSSelectInput
                options={floorOptions}
                placeholder={translate('select_floor')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
                <GSSelectInput
                options={outletsOptions}
                placeholder={translate('select_outlets')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
              </Stack>
            } />

        </Box>
        <GSTable
          columns={columns}
          filteredColumns={filteredColumns}
          currentItems={currentItems} // Ensure this is passed
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e, page) => setCurrentPage(page)}
          keyMapping={Object.fromEntries(columnNames.map((col) => [col.label, col.key]))}
          setFilteredColumns={setFilteredColumns} />

      </Box>
    </Box>);

};

export default Page;