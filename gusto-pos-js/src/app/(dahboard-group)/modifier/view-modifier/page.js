'use client';
import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { useLocalization } from '@/context/LocalizationProvider';

import { groupOptions, filterByLocation, modifierMock } from '@/mock/modifier';
import NewModifier from '@/components/modifier/NewModifier';
import PageHeader from '@/components/widgets/headers/PageHeader';

// Centralized column configuration

const Page = () => {
  const { translate } = useLocalization();
  const columnNames = [
    { label: translate('modifier_add_on'), key: 'modifier', visible: true },
    { label: translate('group'), key: 'groups', visible: true },
    { label: translate('location'), key: 'location', visible: true },
    { label: translate('price'), key: 'price', visible: true },
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

  // Delete function
  const handleDelete = (id) => {
    // eslint-disable-next-line no-console
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const [edit, setEdit] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [response] = useState(modifierMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [filteredColumns, setFilteredColumns] = useState(modifierMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  useEffect(() => {
    const filteredRows = response.filter((items) => {
      const item = `${items.modifier} ${items.groups} ${items.location}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('view_modifier')} />
      <NewModifier
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_modifier') : translate('add_modifier')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={edit || undefined}
      />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_modifier')}
          showFilter
          customButtonAction={() => setShowUserDrawer(true)}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <GSSelectInput
                options={filterByLocation}
                placeholder={translate('filter_by_location')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
              <GSSelectInput
                options={groupOptions}
                placeholder={translate('filter_by_group')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
              />
            </Stack>
          }
          currentItems={currentItems}
        />
      </Stack>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(columns.map((col) => [col.label, col.key]))}
        setFilteredColumns={setFilteredColumns}
        customButtonAction={(value) => {
          setEditMode(true); // Disable edit mode
          setSelectedUser(null);
          setShowUserDrawer(true);
          setEdit(value || null);
        }}
      />
    </Box>
  );
};

export default Page;
