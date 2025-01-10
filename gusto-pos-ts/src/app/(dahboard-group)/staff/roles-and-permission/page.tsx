'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { ColumnType, UserRecord } from '@/types/table-types';
import { useLocalization } from '@/context/LocalizationProvider';
import { rolesMock } from '@/mock/staff';
import PageHeader from '@/components/widgets/headers/PageHeader';
import RolesAndPermissionForm from '@/components/staff/RolesAndPermissionDrawer';

const Page = () => {
  const { translate } = useLocalization();
  // Mock data
  const handleEdit = (id: string | number) => {
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  const [response] = useState(rolesMock);
  const [filteredColumns, setFilteredColumns] = useState(rolesMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  // Centralized column configuration
  const getColumns = (): ColumnType[] => [
    { label: translate('role'), key: 'role', visible: true },

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
        // eslint-disable-next-line no-console
        { type: 'delete', handler: (id) => handleDelete(id) },
      ],
    },
  ];
  const [columns, setColumns] = useState(getColumns());
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.role}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('roles_and_permission')} showMobileView={true} />
      <RolesAndPermissionForm
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_role_permission') : translate('add_role_permission')}
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
          tableTitle={translate('add_new_roles')}
          showPrint
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
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
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
