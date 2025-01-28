'use client';
import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { ColumnType, UserRecord } from '@/types/table-types';
import { modifierMock } from '@/mock/modifier';
import { outlets } from '@/mock/common';
import NewModifier from '@/components/modifier/NewModifier';
import PageHeader from '@/components/widgets/headers/PageHeader';

type EditType = {
  groups?: string;
  outlet?: string;
  cost?: string;
};

const Page = () => {
  const { translate } = useLocalization();
  const getColumns = (): ColumnType[] => [
    { label: translate('modifier_add_on'), key: 'modifier', visible: true },
    { label: translate('group'), key: 'groups', visible: true },
    { label: translate('outlet'), key: 'outlet', visible: true },
    { label: translate('price'), key: 'cost', visible: true },
    {
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        {
          type: 'edit',
          handler: (id) => handleEdit(id),
        },
        {
          type: 'delete',
          handler: (id) => handleDelete(id),
        },
      ],
    },
  ];

  const handleEdit = (id: string | number) => {
    console.log('Edit user with ID:', id);
    const userToEdit = response.find((user) => user.id === id);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setEditMode(true);
      setShowUserDrawer(true);
    }
  };

  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);

  const handleDelete = (id: string | number) => {
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [response] = useState(modifierMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [filteredColumns, setFilteredColumns] = useState(modifierMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(getColumns());

  const outletOptions = [{ label: translate('select_outlet'), value: '' }, ...outlets];

  const groupOptions = [
    { label: translate('all_groups'), value: 'all' },
    ...Array.from(new Set(modifierMock.map((item) => item.groups))).map((group) => ({
      label: group,
      value: group.toLowerCase().replace(/\s+/g, ''),
    })),
  ];

  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false);
  };

  useEffect(() => {
    const filteredRows = response.filter((items) => {
      // Search query filter
      const itemSearchString = `${items.modifier} ${items.groups} ${items.outlet}`.toLowerCase();
      const matchesSearch =
        !searchQuery || itemSearchString.includes(searchQuery.toLowerCase().trim());

      // Outlet filter
      const selectedOutletObj = outlets.find((outlet) => outlet.value === selectedOutlet);
      const matchesOutlet =
        !selectedOutlet ||
        (selectedOutletObj && items.outlet.trim() === selectedOutletObj.label.trim());

      // Group filter
      const matchesGroup =
        selectedGroup === 'all' ||
        items.groups.toLowerCase().replace(/\s+/g, '') ===
          selectedGroup.toLowerCase().replace(/\s+/g, '');

      return matchesSearch && matchesOutlet && matchesGroup;
    });

    setFilteredColumns(filteredRows);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedOutlet, selectedGroup, response]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('modifier')} />
      <NewModifier
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_modifier') : translate('add_modifier')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={(edit as EditType) || undefined}
      />
      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('modifier')}
          showFilter
          customButtonAction={() => setShowUserDrawer(true)}
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
              <GSSelectInput
                options={groupOptions}
                placeholder={translate('filter_by_group')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedGroup}
                onChange={(value) => setSelectedGroup(value || 'all')}
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
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
        keyMapping={Object.fromEntries(columns.map((col) => [col.label, col.key]))}
        setFilteredColumns={setFilteredColumns}
        customButtonAction={(value) => {
          setEditMode(true);
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
