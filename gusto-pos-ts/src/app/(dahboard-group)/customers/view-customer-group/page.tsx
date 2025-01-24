'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { customerGroupMocks } from '@/mock/customer';
import { ColumnType, UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import CustomerGroupFormDrawer from '@/components/customer/CustomerGropuFormDrawer';
type EditType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  customerGroup?: string;
  [key: string]: unknown;
};
const Page = () => {
  const { translate } = useLocalization();
  const getColumns = (): ColumnType[] => [
    { label: translate('customer_group'), key: 'customerGroup', visible: true },

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
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  const [response] = useState(customerGroupMocks);
  const [filteredColumns, setFilteredColumns] = useState(customerGroupMocks);
  const [searchQuery, setSearchQuery] = useState('');

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
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(getColumns());
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.customerGroup}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('customer_group')} />
      <CustomerGroupFormDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_customer_group') : translate('add_customer_group')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={(edit as EditType) || undefined}
      />

      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_new_group')}
          customButtonAction={() => setShowUserDrawer(true)}
          // href="/customers/add-customer-group"
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
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Page;
