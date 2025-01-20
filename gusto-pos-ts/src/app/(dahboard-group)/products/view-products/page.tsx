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

type ProductRecord = {
  id: number;
  itemName: string;
  unit: string;
  createdDate: string;
  showOnWeb: boolean;
  showOnPos: boolean;
};

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

const Page = () => {
  const { translate } = useLocalization();
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [response] = useState(productsData);
  const [filteredColumns, setFilteredColumns] = useState<ProductRecord[]>(productsData);
  const [searchQuery, setSearchQuery] = useState('');

  const getColumns = (): ColumnType[] => [
    { label: translate('product_name'), key: 'itemName', visible: true },
    { label: translate('order'), key: 'unit', visible: true },
    { label: translate('created_date'), key: 'createdDate', visible: true },
    {
      label: translate('show_on_web'),
      key: 'showOnWeb',
      visible: true,
      type: 'toggle',
    },
    {
      label: translate('show_on_pos'),
      key: 'showOnPos',
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
          handler: (id) => handleEdit(id),
        },
        {
          type: 'delete',
          handler: (id) => handleDelete(id),
        },
      ],
    },
  ];

  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);

  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false);
  };

  const handleEdit = (id: string | number) => {
    const userToEdit = filteredColumns.find((user) => user.id === Number(id));
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setEditMode(true);
      setShowUserDrawer(true);
    }
  };
  const handleDelete = (id: string | number) => {
    console.log('Delete user with ID:', id);
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(getColumns());

  // Filter based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user.itemName} ${user['createdDate']} ${user.unit}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('view_product')} showMobileView={true} />

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
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
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
