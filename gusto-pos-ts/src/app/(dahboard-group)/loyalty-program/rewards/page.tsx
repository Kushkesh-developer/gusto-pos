'use client';
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import { useLocalization } from '@/context/LocalizationProvider';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { rewardMock } from '@/mock/rewards';
import { ColumnType, UserRecord } from '@/types/table-types';
import RewardDrawer from '@/components/loyalty-program/RewardDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';
// type EditType={
//   username?: string;
//    id?:string|number;
//    email?: string;
//    [key: string]: unknown;
//    group:string;
//    name?: string;
//    rewardName:string;
// }
type EditType = UserRecord & { rewardName: string };
const Page = () => {
  const { translate } = useLocalization();
  const columnNames: ColumnType[] = [
    { label: translate('no'), key: 'no', visible: true },
    { label: translate('reward_name'), key: 'rewardName', visible: true },
    { label: translate('image'), key: 'image', visible: true, type: 'image' },
    {
      label: translate('points_required_to_claim'),
      key: 'pointsRequiredToClaim',
      visible: true,
    },
    { label: translate('reward_valid_period'), key: 'rewardValidPeriod', visible: true },
    {
      label: translate('show_on_pos_hide'),
      key: 'showPOS',
      visible: true,
      type: 'toggle',
    },
    {
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        { type: 'edit', handler: (id) => console.log('Edit:', id) },
        { type: 'delete', handler: (id) => console.log('Delete:', id) },
      ],
    },
  ];
  // const handleEdit = (id: string | number) => {
  //   // eslint-disable-next-line no-console
  //   console.log("Edit user with ID:", id);
  //   // Add any other logic you want for editing a user, such as routing to an edit page
  // };

  // // Delete function
  // const handleDelete = (id: string | number) => {
  //   // eslint-disable-next-line no-console
  //   console.log("Delete user with ID:", id);
  //   // Filter out the user with the given ID
  //   setFilteredColumns((prevUsers) =>
  //     prevUsers.filter((user) => user.id !== id),
  //   );
  // };

  const [response] = useState(rewardMock);
  const [filteredColumns, setFilteredColumns] = useState(rewardMock);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [edit, setEdit] = useState<EditType | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
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
  const [columns, setColumns] = useState(columnNames);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  return (
    <Stack spacing={2}>
      <PageHeader title={translate('rewards')} showMobileView={true} />

      <RewardDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_rewards') : translate('add_rewards')}
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
          tableTitle={translate('add_rewards')}
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
          if (value) {
            setEdit({
              ...value,
              rewardName: value.rewardName || '', // Ensure rewardName is a string (not undefined)
            });
          }
        }}
      />
    </Stack>
  );
};

export default Page;
