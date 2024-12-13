'use client';
import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';

import { terminalName, outletsOptions, tablesmockResponse } from '@/mock/setting';
import TableDrawer from '@/components/settings/TableDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';
// type EditType = {
//   id?: string | number;
//   name?: string;
//   phone?: string;
//   email?: string;
//   role?: string;
//   [key: string]: unknown;
//   customerGroup?: string;
//   terminalName?: string;
// };
// Mock data

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(tablesmockResponse);
  const [filteredColumns, setFilteredColumns] = useState(tablesmockResponse);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const columnNames = [
  { label: translate('terminal_id'), key: 'terminalId', visible: true },
  { label: translate('terminal_name'), key: 'terminalName', visible: true },
  { label: translate('outlets'), key: 'outlets', visible: true },
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
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.terminalId !== id));
  };
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.terminalId} ${user.terminalName} ${user.status}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('table_management')} />

      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
        customButtonAction={(value) => {
          setEditMode(true); // Disable edit mode
          setSelectedUser(null);
          setShowUserDrawer(true);
          setEdit(value || null);
        }} />

      <Box mt={5}>
        <PageHeader title={translate('tables')} />
        <TableDrawer
          open={showUserDrawer}
          onClose={handleCloseDrawer}
          formTitle={editMode ? translate('edit_new_terminal') : translate('add_new_terminal')}
          initialData={selectedUser}
          editMode={editMode}
          setEdit={setEdit}
          edit={edit || undefined} />

        <Box sx={{ mt: 2 }}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            tableTitle={translate('add_table')}
            renderFilterElement={
            <Stack direction="row" spacing={2}>
                <GSSelectInput
<<<<<<< HEAD
                  options={terminalName}
                  placeholder={translate('select_terminal_name')}
                  variant="theme" // Pass type as "theme" to enable primary color styling
                  placeholderColor="primary" // Ensures placeholder text color is primary
                />
=======
                options={floorOptions}
                placeholder={translate('select_floor')}
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
>>>>>>> 68e431412d63501ef47aa3cacf76680d07c0295b
                <GSSelectInput
                options={outletsOptions}
                placeholder={translate('select_outlets')}
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
              </Stack>
            }
            showPrint
            showExcel
            showPdf
            showFilter
            customButtonAction={() => setShowUserDrawer(true)}
            currentItems={currentItems} />

        </Box>
        <GSTable
          columns={columns}
          filteredColumns={filteredColumns}
          currentItems={currentItems} // Ensure this is passed
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e, page) => setCurrentPage(page)}
          setFilteredColumns={setFilteredColumns}
          customButtonAction={(value) => {
            setEditMode(true); // Disable edit mode
            setSelectedUser(null);
            setShowUserDrawer(true);
            setEdit(value || null);
          }} />

      </Box>
    </Box>);

};

export default Page;