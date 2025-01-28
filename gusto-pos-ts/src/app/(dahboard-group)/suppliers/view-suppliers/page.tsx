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

// Match the EditType from AddSupplierDrawer
type EditType = {
  id?: string | number;
  email?: string;
  group: string;
  name?: string;
  phone?: number;
  companyName?: string;
  postalCode: number;
  officeTelephone?: number;
  contactPerson: string;
  [key: string]: unknown;
};

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(supplierMock);
  const [filteredColumns, setFilteredColumns] = useState(supplierMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [edit, setEdit] = useState<UserRecord | null>(null); // Changed to null to match AddSupplierDrawer props
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<EditType | null>(null);
  const [editMode, setEditMode] = useState(false);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const ensureNumber = (value: unknown): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseInt(value) || 0;
    return 0;
  };

  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem).map((user) => ({
    id: user.id,
    companyName: user.companyName ?? '',
    contactPerson: user.contactPerson ?? '',
    phone: user.phone,
    officeTelephone: ensureNumber(user.officeTelephone),
    email: user.email ?? '',
    postalCode: ensureNumber(user.postalCode),
  }));

  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const handleEdit = (id: string | number) => {
    console.log('Edit user with ID:', id);
  };

  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEdit(null);
    setEditMode(false);
  };

  const handleDelete = (id: string | number) => {
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const getColumns = (): ColumnType[] => [
    { label: translate('company_name'), key: 'companyName', visible: true },
    { label: translate('contact_person'), key: 'contactPerson', visible: true },
    { label: translate('mobile'), key: 'phone', visible: true },
    { label: translate('office_tel'), key: 'officeTelephone', visible: true },
    { label: translate('email'), key: 'email', visible: true },
    { label: translate('postal_code'), key: 'postalCode', visible: true },
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

  const [columns, setColumns] = useState(getColumns());

  useEffect(() => {
    setColumns(getColumns());
    console.log('edit', edit);
  }, [translate]);

  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users =
        `${user.id} ${user.companyName} ${user.contactPerson} ${user.phone} ${user.officeTelephone} ${user.email}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('supplier')} />
      <AddSupplierDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_supplier') : translate('add_supplier')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={selectedUser as EditType} // Cast to EditType since it matches the structure
      />
      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('supplier')}
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
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
        customButtonAction={(value?: UserRecord) => {
          if (!value) return;

          setEditMode(true);
          setSelectedUser({
            ...value,
            officeTelephone: ensureNumber(value.officeTelephone),
            contactPerson: String(value.contactPerson),
            group: value.group || '',
            postalCode: ensureNumber(value.postalCode),
          });
          setShowUserDrawer(true);
        }}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Page;
