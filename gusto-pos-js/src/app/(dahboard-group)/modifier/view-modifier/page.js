'use client';
import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { useLocalization } from '@/context/LocalizationProvider';

import { modifierMock } from '@/mock/modifier';
import NewModifier from '@/components/modifier/NewModifier';
import PageHeader from '@/components/widgets/headers/PageHeader';







const Page = () => {
  const { translate } = useLocalization();
  const columnNames = [
  { label: translate('modifier_add_on'), key: 'modifier', visible: true },
  { label: translate('group'), key: 'groups', visible: true },
  { label: translate('location'), key: 'location', visible: true },
  { label: translate('price'), key: 'cost', visible: true },
  {
    label: translate('action'),
    key: 'action',
    visible: true,
    isAction: true,
    actions: [
    {
      type: 'edit',
      handler: (id) => handleEdit(id)
    },
    {
      type: 'delete',
      handler: (id) => handleDelete(id)
    }]

  }];


  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
    const userToEdit = response.find((user) => user.id === id);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setEditMode(true);
      setShowUserDrawer(true);
    }
  };

  const handleDelete = (id) => {
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const [edit, setEdit] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [response] = useState(modifierMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [filteredColumns, setFilteredColumns] = useState(modifierMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  // Dynamically generate location options with "All" as the first option
  const locationOptions = [
  { label: translate('all_locations'), value: 'all' },
  ...Array.from(new Set(modifierMock.map((item) => item.location))).map((location) => ({
    label: location,
    value: location.toLowerCase().replace(/\s+/g, '')
  }))];


  // Dynamically generate group options with "All" as the first option
  const groupOptions = [
  { label: translate('all_groups'), value: 'all' },
  ...Array.from(new Set(modifierMock.map((item) => item.groups))).map((group) => ({
    label: group,
    value: group.toLowerCase().replace(/\s+/g, '')
  }))];


  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false);
  };

  useEffect(() => {
    const filteredRows = response.filter((items) => {
      // Search query filter
      const itemSearchString = `${items.modifier} ${items.groups} ${items.location}`.toLowerCase();
      const matchesSearch =
      !searchQuery || itemSearchString.includes(searchQuery.toLowerCase().trim());

      // Location filter
      const matchesLocation =
      selectedLocation === 'all' ||
      items.location.toLowerCase().replace(/\s+/g, '') ===
      selectedLocation.toLowerCase().replace(/\s+/g, '');

      // Group filter
      const matchesGroup =
      selectedGroup === 'all' ||
      items.groups.toLowerCase().replace(/\s+/g, '') ===
      selectedGroup.toLowerCase().replace(/\s+/g, '');

      return matchesSearch && matchesLocation && matchesGroup;
    });

    setFilteredColumns(filteredRows);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedLocation, selectedGroup, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('view_modifier')} showMobileView={true} />
      <NewModifier
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_modifier') : translate('add_modifier')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={edit || undefined} />

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
              options={locationOptions}
              placeholder={translate('filter_by_location')}
              height="40px"
              variant="theme"
              placeholderColor="primary"
              value={selectedLocation}
              onChange={(value) => setSelectedLocation(value || 'all')} />

              <GSSelectInput
              options={groupOptions}
              placeholder={translate('filter_by_group')}
              height="40px"
              variant="theme"
              placeholderColor="primary"
              value={selectedGroup}
              onChange={(value) => setSelectedGroup(value || 'all')} />

            </Stack>
          }
          currentItems={currentItems} />

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
          setEditMode(true);
          setSelectedUser(null);
          setShowUserDrawer(true);
          setEdit(value || null);
        }} />

    </Box>);

};

export default Page;