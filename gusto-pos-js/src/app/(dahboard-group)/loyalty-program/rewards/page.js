'use client';
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import { useLocalization } from '@/context/LocalizationProvider';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { rewardMock } from '@/mock/rewards';

import RewardDrawer from '@/components/loyalty-program/RewardDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';









const Page = () => {
  const { translate } = useLocalization();

  const customButtonAction = (value) => {
    setEditMode(true);
    setSelectedUser(null);
    setShowUserDrawer(true);

    if (value) {
      const editValue = {
        ...value,
        rewardName: value.rewardName || '',
        pointsRequiredToClaim: Number(value.pointsRequiredToClaim) || 0
      };
      setEdit(editValue);
    }
  };

  const getColumns = () => [
  { label: translate('reward_name'), key: 'rewardName', visible: true },
  { label: translate('image'), key: 'image', visible: true, type: 'image' },
  {
    label: translate('points_required_to_claim'),
    key: 'pointsRequiredToClaim',
    visible: true
  },
  { label: translate('reward_valid_period'), key: 'rewardValidPeriod', visible: true },
  {
    label: translate('show_on_pos_hide'),
    key: 'showPOS',
    visible: true,
    type: 'toggle'
  },
  {
    label: translate('action'),
    key: 'action',
    visible: true,
    isAction: true,
    actions: [
    { type: 'edit', handler: (id) => handleEdit(id) },
    { type: 'delete', handler: (id) => handleDelete(id) }]

  }];


  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);

  const [response] = useState(rewardMock);
  const [filteredColumns, setFilteredColumns] = useState(rewardMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [edit, setEdit] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filteredRows = response.filter((item) => {
      const itemName = `${item.rewardName}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return itemName.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const [columns, setColumns] = useState(getColumns());

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
  };
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  const handleDelete = (id) => {
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  return (
    <Stack spacing={2}>
      <PageHeader title={translate('rewards')} />

      <RewardDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_rewards') : translate('add_rewards')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={edit} />


      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('rewards')}
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
        customButtonAction={customButtonAction}
        onDelete={handleDelete} />

    </Stack>);

};

export default Page;