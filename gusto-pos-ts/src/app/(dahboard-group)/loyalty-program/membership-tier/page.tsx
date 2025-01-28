'use client';
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import { useLocalization } from '@/context/LocalizationProvider';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { memberTableData } from '@/mock/membership';
import { ColumnType, UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import MemberShipTier from '@/components/loyalty-program/MemberShipTier';

type EditType = UserRecord & {
  membership_name: string;
  minimum_point_to_redeem: string;
  expiry_period: string;
  unlock_accumulated: string;
  maximum_point: string;
  $1_spent_equal_to: string;
};
const Page = () => {
  const { translate } = useLocalization();
  const getColumns = (): ColumnType[] => [
    { label: translate('membership_name'), key: 'membership_name', visible: true },
    { label: translate('minimum_point_to_redeem'), key: 'minimum_point_to_redeem', visible: true },
    { label: translate('expiry_period'), key: 'expiry_period', visible: true },
    {
      label: translate('unlock_accumulated'),
      key: 'unlock_accumulated',
      visible: true,
      type: 'toggle',
    },
    { label: translate('maximum_point'), key: 'maximum_point', visible: true },
    {
      label: translate('$1_spent_equal_to'),
      key: '$1_spent_equal_to',
      visible: true,
    },
    {
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        { type: 'edit', handler: (id) => handleEdit(id) },
        { type: 'delete', handler: (id) => handleDelete(id) },
      ],
    },
  ];

  const handleDelete = (id: string | number) => {
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const handleEdit = (id: string | number) => {
    console.log('Edit user with ID:', id);
  };
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  const [response] = useState(memberTableData);
  const [filteredColumns, setFilteredColumns] = useState(memberTableData);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [selectedUser, setSelectedUser] = useState<EditType | null>(null);
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
  const [columns, setColumns] = useState(getColumns());
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };

  return (
    <Stack spacing={2}>
      <PageHeader title={translate('membership_tiers')} />
      <MemberShipTier
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_membership') : translate('add_membership')}
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
          tableTitle={translate('add_membership')}
          customButtonAction={() => setShowUserDrawer(true)}
          showPrint
          showExcel
          showPdf
          showFilter
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
          setEditMode(true); // Disable edit mode
          setSelectedUser(null);
          setShowUserDrawer(true);
          setEdit(value || null);
        }}
        onDelete={handleDelete}
      />
    </Stack>
  );
};

export default Page;
