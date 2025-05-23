'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';

import { useLocalization } from '@/context/LocalizationProvider';
import { outletMockResponse } from '@/mock/setting';
import OutletDrawer from '@/components/settings/OutletDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  // Mock data
  const { translate } = useLocalization();

  const [response] = useState(outletMockResponse);
  const [filteredColumns, setFilteredColumns] = useState(outletMockResponse);

  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [edit, setEdit] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  const getColumns = () => [
    { label: translate('id'), key: 'outletId', visible: true },
    { label: translate('name'), key: 'name', visible: true },
    { label: translate('address'), key: 'address', visible: true },
    { label: translate('postal'), key: 'postal', visible: true },
    { label: translate('phone'), key: 'phone', visible: true },
    {
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        {
          type: 'edit',
          // eslint-disable-next-line no-console
          handler: (id) => handleEdit(id),
        },
        {
          type: 'delete',
          // eslint-disable-next-line no-console
          handler: (id) => handleDelete(id),
        },
      ],
    },
  ];

  const handleEdit = (id) => {
    // eslint-disable-next-line no-console
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  // Delete function
  const handleDelete = (id) => {
    // eslint-disable-next-line no-console
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const [columns, setColumns] = useState(getColumns()); // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.outletId} ${user.name} ${user.address}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('outlets')} />

      <OutletDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_outlet') : translate('add_outlet')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={edit || undefined}
      />

      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_new_outlet')}
          showPrint
          tableTitlePrint={translate('outlets_list')}
          showExcel
          showPdf
          showFilter
          customButtonAction={() => setShowUserDrawer(true)}
          currentItems={currentItems}
        />
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
        }}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Page;
