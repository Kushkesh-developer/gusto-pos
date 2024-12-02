'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { UserRecord, ColumnType } from '@/types/table-types';
import { useLocalization } from '@/context/LocalizationProvider';
import { staffMock } from '@/mock/staff';
import StaffFormDrawer from '@/components/staff/StaffFormDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(staffMock);
  const [filteredColumns, setFilteredColumns] = useState(staffMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Handle edit action
  const handleEdit = (id: string | number) => {
    const userToEdit = filteredColumns.find((user) => user.id === id);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setEditMode(true); // Enable edit mode
      setShowUserDrawer(true);
    }
  };

  // Handle delete action
  const handleDelete = (id: string | number) => {
    console.log('Delete user with ID:', id);
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Close the drawer and reset state
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = ` ${user.id} ${user.username} ${user.phone} ${user.email}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  const columnNames: ColumnType[] = [
    { label: translate('name'), key: 'username', visible: true },
    { label: translate('phone'), key: 'phone', visible: true },
    { label: translate('email'), key: 'email', visible: true },
    { label: translate('role'), key: 'role', visible: true },
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

  const [columns, setColumns] = useState(columnNames);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('view_staff')} />
      <StaffFormDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? 'Edit Staff' : 'Add New Staff'}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={edit || undefined}
        // Pass edit mode to the drawer
      />
      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_new_staff')}
          showPrint
          showExcel
          showPdf
          showFilter
          customButtonAction={() => {
            setEditMode(false); // Disable edit mode
            setSelectedUser(null);
            setShowUserDrawer(true);
          }}
          currentItems={currentItems}
        />
      </Box>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
        customButtonAction={(value) => {
          setEditMode(true); // Disable edit mode
          setSelectedUser(null);
          setShowUserDrawer(true);
          setEdit(value);
        }}
      />
    </Box>
  );
};

export default Page;
