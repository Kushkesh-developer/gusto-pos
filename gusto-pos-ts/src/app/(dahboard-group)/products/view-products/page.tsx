'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { UserRecord, ColumnType } from '@/types/table-types';
import { useLocalization } from '@/context/LocalizationProvider';
import { productsData } from '@/mock/products';
import PageHeader from '@/components/widgets/headers/PageHeader';
import AddProductItemDrawer from '@/components/product/AddProductItemDrawer';
type EditType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
  itemName: string;
  unit: string;
};
// Mock data

const Page = () => {
  const { translate } = useLocalization();
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [response] = useState(productsData);
  const [filteredColumns, setFilteredColumns] = useState(productsData);
  const [searchQuery, setSearchQuery] = useState('');
  const columnNames: ColumnType[] = [
    { label: translate('product_name'), key: 'itemName', visible: true },
    { label: translate('order'), key: 'unit', visible: true },
    { label: translate('created_date'), key: 'Created Date', visible: true },
    {
      label: translate('show_on_web'),
      key: 'Show on Web',
      visible: true,
      type: 'toggle',
    },
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

  // Delete function
  const handleDelete = (id: string | number) => {
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  const handleEdit = (id: string | number) => {
    const userToEdit = filteredColumns.find((user) => user.id === id);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setEditMode(true); // Enable edit mode
      setShowUserDrawer(true);
    }
  };
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.itemName} ${user['Created Date']} ${user.unit} `.toLowerCase();

      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('view_product')} />
      <AddProductItemDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_product') : translate('view_product')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={edit as EditType | undefined}
      />

      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_product')}
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
