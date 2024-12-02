'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { ColumnType, UserRecord } from '@/types/table-types';
import { useLocalization } from '@/context/LocalizationProvider';
import { supplierMock } from '@/mock/staff';
import PageHeader from '@/components/widgets/headers/PageHeader';
import AddSupplierDrawer from '@/components/supplier/AddSupplierDrawer';
type editType = UserRecord & { contactPerson: string };
// Mock data

const Page = () => {
  const { translate } = useLocalization();

  const [response] = useState(supplierMock);
  const [filteredColumns, setFilteredColumns] = useState(supplierMock);
  const [searchQuery, setSearchQuery] = useState('');
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const handleEdit = (id: string | number) => {
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };
  const [edit, setEdit] = useState<editType | null>(null);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  // Centralized column configuration
  const columnNames: ColumnType[] = [
    { label: translate('company_name'), key: 'companyName', visible: true },
    { label: translate('contact_person'), key: 'contactPerson', visible: true },
    { label: translate('mobile'), key: 'phone', visible: true },
    { label: translate('office'), key: 'Office', visible: true },
    { label: translate('email'), key: 'email', visible: true },
    { label: translate('postal_code'), key: 'Postal Code', visible: true },
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
  const [columns, setColumns] = useState(columnNames);

  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users =
        `${user.id} ${user.companyName}   ${user.contactPerson} ${user.phone} ${user.Office} ${user.Email}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('view_supplier')} />
      <AddSupplierDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? 'Edit Supplier' : 'View Supplier'}
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
          tableTitle={translate('add_new_suppliers')}
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
          setEdit({
            ...value,
            contactPerson: value.contactPerson || '', // Ensure rewardName is a string (not undefined)
          });
        }}
      />
    </Box>
  );
};

export default Page;
