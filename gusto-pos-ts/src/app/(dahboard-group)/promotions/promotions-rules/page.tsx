'use client';
import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { discountMock } from '@/mock/discount';
import { ColumnType, UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import PromotionFormDrawer from '@/components/promotions/PromotionFormDrawer';

const Page = () => {
  const { translate } = useLocalization();
  const getColumns = (): ColumnType[] => [
    { label: translate('name'), key: 'discountName', visible: true },
    { label: translate('discount_value'), key: 'discountValue', visible: true },
    { label: translate('start_date'), key: 'startDate', visible: true },
    { label: translate('end_date'), key: 'endDate', visible: true },
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
  const handleEdit = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const [response] = useState(discountMock);
  const [filteredColumns, setFilteredColumns] = useState(discountMock);
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filteredRows = response.filter((item) => {
      const itemName = `${item.discountName}`.toLowerCase();
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
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('promotions_rules')} showMobileView={true} />
      <PromotionFormDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_promotion_rule') : translate('add_promotion_rule')}
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
          tableTitle={translate('add_promotion_rules')}
          // href="/promotions/add-promotions-rules"
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
      />
    </Box>
  );
};

export default Page;
