'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';

import { useLocalization } from '@/context/LocalizationProvider';
import { supplierMock } from '@/mock/staff';
import PageHeader from '@/components/widgets/headers/PageHeader';
import AddSupplierDrawer from '@/components/supplier/AddSupplierDrawer';
// type EditType = UserRecord & { contactPerson: string };
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
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem).map((user) => ({
    id: user.id,
    companyName: user.companyName ?? '',
    contactPerson: user.contactPerson ?? '',
    phone: user.phone ?? '',
    officeTelephone: user.officeTelephone ?? '',
    email: user.email ?? '',
    postalCode: user.postalCode ?? '',
  }));
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };
  const [edit, setEdit] = useState(null);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };

  // Delete function
  const handleDelete = (id) => {
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  // Centralized column configuration
  const columnNames = [
    { label: translate('company_name'), key: 'companyName', visible: true },
    { label: translate('contact_person'), key: 'contactPerson', visible: true },
    { label: translate('mobile'), key: 'phone', visible: true },
<<<<<<< HEAD
    { label: translate('office'), key: 'officeTelephone', visible: true },
=======
    { label: translate('office'), key: 'office', visible: true },
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
    { label: translate('email'), key: 'email', visible: true },
    { label: translate('postal_code'), key: 'postalCode', visible: true },
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
<<<<<<< HEAD
        `${user.id} ${user.companyName}   ${user.contactPerson} ${user.phone} ${user.officeTelephone} ${user.email}`.toLowerCase();
=======
        `${user.id} ${user.companyName}   ${user.contactPerson} ${user.phone} ${user.office} ${user.email}`.toLowerCase();
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);
  console.log();

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('view_supplier')} />
      <AddSupplierDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_supplier') : translate('view_supplier')}
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
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
        customButtonAction={(value) => {
          if (!value) {
            // If `value` is undefined or null, we should return early or handle it gracefully.
            return;
          }

          setEditMode(true); // Enable edit mode
          setSelectedUser(null);
          setShowUserDrawer(true);

          // Ensure `contactPerson` is always a string (either from `value` or fallback to empty string).
          const newEdit = {
            ...value, // Spread other properties from `value`
            contactPerson: value.contactPerson ? String(value.contactPerson) : '', // Ensure contactPerson is always a string
            rewardName: value.rewardName || '', // Fallback to empty string if rewardName is missing
            group: value.group || '', // Ensure group is always a string, fallback to an empty string
          };

          setEdit(newEdit); // Set the edited object
        }}
      />
    </Box>
  );
};

export default Page;
