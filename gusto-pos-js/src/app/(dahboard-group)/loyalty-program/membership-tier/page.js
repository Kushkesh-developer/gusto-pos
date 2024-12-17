'use client';
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import { useLocalization } from '@/context/LocalizationProvider';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { memberTableData } from '@/mock/membership';

import LoyaltyDrawer from '@/components/loyalty-program/LoyaltyDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';









const Page = () => {
  const { translate } = useLocalization();
  const columnNames = [
  { label: translate('membership_name'), key: 'membership_name', visible: true },
  { label: translate('minimum_point_to_redeem'), key: 'minimum_point_to_redeem', visible: true },
  { label: translate('expiry_period'), key: 'expiry_period', visible: true },
  {
    label: translate('unlock_accumulated'),
    key: 'unlock_accumulated',
    visible: true
  },
  { label: translate('maximum_point'), key: 'maximum_point', visible: true },
  {
    label: translate('$1_spent_equal_to'),
    key: '$1_spent_equal_to',
    visible: true,
    type: 'toggle'
  },
  {
    label: translate('action'),
    key: 'action',
    visible: true,
    isAction: true,
    actions: [
    { type: 'edit', handler: (id) => console.log('Edit:', id) },
    { type: 'delete', handler: (id) => console.log('Delete:', id) }]

  }];


  const [response] = useState(memberTableData);
  const [filteredColumns, setFilteredColumns] = useState(memberTableData);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [edit, setEdit] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filteredRows = response.filter((item) => {
      const itemName = `${item.membership_name}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return itemName.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);
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

  return (
    <Stack padding={3} spacing={2}>
      <PageHeader title={translate('membership_tier')} />
      <LoyaltyDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_membership') : translate('add_membership')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={edit || undefined} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_membership')}
          customButtonAction={() => setShowUserDrawer(true)}
          showPrint
          showExcel
          showPdf
          showFilter
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
          setEditMode(true); // Disable edit mode
          setSelectedUser(null);
          setShowUserDrawer(true);
          setEdit(value || null);
        }} />

    </Stack>);

};

export default Page;